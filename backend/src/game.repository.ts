import { Injectable } from "@nestjs/common";
import { Game } from "./game.interface";

@Injectable()
export class GameRepository {
    private readonly games: Game[] = [
        {
            id: 'room1',
            created: new Date(),
            word: 'APPLE',
            players: []
        }
    ];
    
    createGame(game: Game) {
        this.games.push(game);
    }

    getGame(id: string): Game {
        return this.games.find(x => x.id === id);
    }

    addPlayer(gameId: string, playerId: string) {
        const game = this.getGame(gameId);
        game.players.push(playerId);
    }
}