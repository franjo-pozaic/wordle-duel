import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameRepository } from './game.repository';
import { GameGateway } from './game.gateway';

@Module({
  imports: [],
  controllers: [AppController, GameController],
  providers: [AppService, GameService, GameRepository, GameGateway],
})
export class AppModule {}
