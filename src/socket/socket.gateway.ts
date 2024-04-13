import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
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
