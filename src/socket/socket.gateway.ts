import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@WebSocketGateway({
  cookie: true,
  cors: true,
  transports: ['websocket'],
})
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {}
}
