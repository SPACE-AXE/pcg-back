import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailToken } from './entities/email-token.entity';
import { Repository } from 'typeorm';
import { ResetEmailDto as ResetEmailDto } from './dto/reset-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(EmailToken)
    private readonly emailTokenRepository: Repository<EmailToken>,
  ) {}

  async sendResetEmail(body: ResetEmailDto) {
    const user = await this.userService.findOneByUserNameAndEmail(body);
    if (!user) {
      throw new NotFoundException('Username or email is not valid');
    }

    const transporter = nodemailer.createTransport({
      service: 'naver',
      host: 'smtp.naver.com', // SMTP 서버명
      port: 465, // SMTP 포트
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });

    const token = randomBytes(10).toString('hex');

    const mailResult = await transporter.sendMail({
      from: this.configService.get('MAIL_USER'),
      to: body.email,
      subject: '[박차고] 비밀번호 찾기',
      html: `<p>비밀번호 재설정을 위한 코드는 ${token} 입니다. 이 코드는 5분간 유효합니다.</p>`,
    });

    const newEmailToken = this.emailTokenRepository.create({ token, user });
    await this.emailTokenRepository.insert(newEmailToken);

    return mailResult;
  }

  async resetPassword(body: ResetPasswordDto) {
    const emailToken = await this.emailTokenRepository.findOne({
      where: { token: body.token },
    });

    if (
      !emailToken ||
      emailToken.createdAt.getTime() + 300 < Date.now() //TTL 5분이 초과되었을 경우
    ) {
      await this.emailTokenRepository.delete(emailToken.id);
      throw new UnauthorizedException('Token is not valid');
    }

    await this.emailTokenRepository.delete(emailToken.id);

    return await this.userService.update(emailToken.user.id, {
      password: bcrypt.hashSync(body.password, 10),
    });
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUserName(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } else return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      id: user.id,
      nickname: user.nickname,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '1h',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '7d',
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
