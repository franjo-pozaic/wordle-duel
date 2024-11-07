import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { GameRepository } from "./game.repository";
import { Game } from "./game.interface";


@Injectable()
export class GameService {
    constructor(private gameRepository: GameRepository) {}

    createGame(): string {
        const game: Game = {
            word: 'APPLE',
            created: new Date(),
            id: randomUUID(),
            players: []
        }
        this.gameRepository.createGame(game);
        return game.id;
    }

    gameExists(id: string): boolean {
        return Boolean(this.gameRepository.getGame(id));
    }

    addPlayer(gameId: string, playerId: string) {
        this.gameRepository.addPlayer(gameId, playerId);
    }
}