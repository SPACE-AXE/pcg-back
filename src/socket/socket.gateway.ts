import { WebSocketGateway } from '@nestjs/websockets';
import { SocketService } from './socket.service';

@WebSocketGateway({ cookie: true, cors: true, transports: ['websocket'] })
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {}
}
