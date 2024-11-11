import { Controller, Get, HttpException, HttpStatus, Logger, Param, Post } from "@nestjs/common";
import { GameService } from "./game.service";

@Controller('game')
export class GameController {
    constructor(private gameService: GameService) {}
    
	private logger: Logger = new Logger('GameController');

    @Post()
    createNewGame() {
        const game = this.gameService.createGame();
        this.logger.log('Game created!', game.id)
        return game;        
    }
    
    @Get(':id')
    getGame(@Param('id') id: string) {
        const game = this.gameService.getGame(id);

        if (!game) {
            this.logger.log('Game doesnt exist!', id)
            throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
        }

        return game;
    }
}