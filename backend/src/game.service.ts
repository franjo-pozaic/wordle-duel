import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { GameRepository } from "./game.repository";
import { Game } from "./game.interface";

const wordleWords = [
    "apple",
    "grape",
    "house",
    "zebra",
    "piano",
    "jumps",
    "truck",
    "flute",
    "brick",
    "spice",
    "crane",
    "trace",
    "sheep",
    "vivid",
    "plane",
    "table",
    "cloud",
    "beach",
    "shiny",
    "brush",
    "tiger",
    "chair",
    "green",
    "spark",
    "robot",
    "frame",
    "music",
    "queen",
    "quick",
    "glass"
  ];
  

@Injectable()
export class GameService {
    constructor(private gameRepository: GameRepository) {}

    createGame() {
        const randomWord = wordleWords[Math.floor(Math.random() * wordleWords.length)];

        const game: Game = {
            word: randomWord.toUpperCase(),
            created: new Date(),
            id: randomUUID(),
            players: []
        }
        this.gameRepository.createGame(game);
        return game;
    }

    getGame(id: string) {
        return this.gameRepository.getGame(id);
    }

    gameExists(id: string): boolean {
        return Boolean(this.gameRepository.getGame(id));
    }

    addPlayer(gameId: string, playerId: string) {
        this.gameRepository.addPlayer(gameId, playerId);
    }

    allPlayersJoined(gameId: string) {
        const game = this.gameRepository.getGame(gameId);
        return game && game.players.length == 2;
    }
}