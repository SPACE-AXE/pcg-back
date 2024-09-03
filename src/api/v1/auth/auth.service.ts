import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import bcrypt from 'bcrypt';
import { UserV1 } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailToken } from './entities/email-token.entity';
import { LessThan, Repository } from 'typeorm';
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

    const token = randomBytes(3).toString('hex');

    const newEmailToken = this.emailTokenRepository.create({
      token,
      user,
      createdAt: new Date(),
    });
    await this.emailTokenRepository.insert(newEmailToken);

    const mailResult = await transporter.sendMail({
      from: this.configService.get('MAIL_USER'),
      to: body.email,
      subject: '[박차고] 비밀번호 찾기',
      html: `<p>비밀번호 재설정을 위한 코드는 ${token} 입니다. 이 코드는 5분간 유효합니다.</p>`,
    });

    return mailResult;
  }

  async resetPassword(body: ResetPasswordDto) {
    const expiredTokens = await this.emailTokenRepository.find({
      where: { createdAt: LessThan(new Date(Date.now() - 300 * 1000)) },
    });

    await this.emailTokenRepository.remove(expiredTokens);

    const emailToken = await this.emailTokenRepository.findOne({
      where: { token: body.token },
      relations: { user: true },
    });

    if (
      !emailToken ||
      emailToken.createdAt.getTime() / 1000 + 300 < Date.now() / 1000 //TTL 5분이 초과되었을 경우
    ) {
      emailToken
        ? await this.emailTokenRepository.delete(emailToken.id)
        : undefined;
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

  async login(user: UserV1) {
    const payload = {
      username: user.username,
      id: user.id,
      nickname: user.nickname,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: this.configService.get('JWT_SECRET'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: this.configService.get('JWT_SECRET'),
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
