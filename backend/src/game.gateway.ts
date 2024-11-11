import { Logger } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { GameService } from "./game.service";

@WebSocketGateway({ namespace: 'duel', cors: true })
export class GameGateway {
    constructor(private gameService: GameService) { }

	private logger: Logger = new Logger('GameGateway');

    @WebSocketServer() wss: Server;

    afterInit(server: any) {
		this.logger.log('Initialize ChatGateway!');
	}

	handleConnection(client: Socket, ...args: any[]) {
        const gameId = client.handshake.query.gameId as string;
        if (!this.gameService.gameExists(gameId)) {
            client.disconnect();
            this.logger.log(`Game ${gameId} doesn't exist, client disconnected: ${client.id}`);
        } else {
            client.join(gameId);
            this.logger.log(`Client connected: ${client.id}`);
            this.logger.log(`Client ${client.id} joined room: ${gameId}`);

        }
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}

    @SubscribeMessage('move')
	handleChatMessage(client: Socket, payload: { board: string[][] }) {
		this.logger.log(payload);
        const gameId = Array.from(client.rooms)[1];
        this.logger.log(`Emitting to game: ${gameId}`);
        client.to(gameId).emit('move', payload);
	}
}