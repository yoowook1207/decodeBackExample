import { Body, Controller, Post } from '@nestjs/common';
import { StoryTellerService } from './story-teller.service';

@Controller('story-teller')
export class StoryTellerController {
  constructor(private storyTellerService: StoryTellerService) {}

  @Post('/plot')
  storySetup(@Body() req: any): Promise<{ assistant: string }> {
    return this.storyTellerService.plotSetup(req);
}

  @Post('/test')
  test(@Body() req: any): Promise<any> {
    return this.storyTellerService.testPost(req);
  }
}
