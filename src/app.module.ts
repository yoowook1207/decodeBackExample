import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoryTellerService } from './story-teller/story-teller.service';
import { StoryTellerController } from './story-teller/story-teller.controller';
import { StoryTellerModule } from './story-teller/story-teller.module';

@Module({
  imports: [StoryTellerModule],
  controllers: [AppController, StoryTellerController],
  providers: [AppService, StoryTellerService],
})
export class AppModule {}
