import { Module } from '@nestjs/common';
import {StoryTellerService} from "./story-teller.service";
import {StoryTellerController} from "./story-teller.controller";

@Module({
    providers: [StoryTellerService],
    controllers: [StoryTellerController]
})
export class StoryTellerModule { }
