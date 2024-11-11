import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { GameRepository } from "./game.repository";
import { Game } from "./game.interface";


@Injectable()
export class GameService {
    constructor(private gameRepository: GameRepository) {}

    createGame() {
        const game: Game = {
            word: 'BEAST',
            created: new Date(),
            id: randomUUID(),
            players: []
        }
        this.gameRepository.createGame(game);
        return game;
    }

    gameExists(id: string): boolean {
        return Boolean(this.gameRepository.getGame(id));
    }

    addPlayer(gameId: string, playerId: string) {
        this.gameRepository.addPlayer(gameId, playerId);
    }
}