import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { Message } from '../utils/interfaces/message.interface';
import { environment } from '../environment/environment';

@Injectable()
export class StoryTellerService {
  apiKey = environment.openaiKey;

  configuration = new Configuration({
    apiKey: this.apiKey,
  });
  openai = new OpenAIApi(this.configuration);

  async plotSetup(req): Promise<any> {
    const { userMessages, assistantMessages } = req;
    const messages: any = [
      // init system setting
      {
        role: 'system',
        content:
          '당신은 Venture Capital의 유명한 투자가입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 Jason입니다. 당신은 스타트업 기업의 미래를 매우 명확하게 예측하고 아이디어의 가능성에 대한 답을 줄 수 있습니다. 스타트업 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.',
      },
      // duplicated system setting using user role
      {
        role: 'user',
        content:
          '당신은 Venture Capital의 유명한 투자가입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 Jason입니다. 당신은 스타트업 기업의 미래를 매우 명확하게 예측하고 아이디어의 가능성에 대한 답을 줄 수 있습니다. 스타트업 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.',
      },
      // the first response from openai api (assistant)
      {
        role: 'assistant',
        content:
          '안녕하세요! 저는 Jason입니다. 투자와 스타트업 기업에 관한 질문이 있으신가요? 어떤 것이든 물어보세요, 최선을 다해 답변해 드리겠습니다.',
      },
      // the first ask from user
      {
        role: 'user',
        content: `AI와 머신러닝 기술을 이용해 성공한 스타트업 기업들에 대해 묻고 싶어.`,
      },
      // question confirmation
      {
        role: 'assistant',
        content: `네, AI와 머신러닝 기술을 이용해 성공한 스타트업 기업들에 대해 무엇이든 물어보세요!`,
      },
    ];

    // send all message threads to api
    while (userMessages.length != 0 || assistantMessages.length != 0) {
      if (userMessages.length != 0) {
        messages.push({
          role: 'user',
          content: userMessages.shift(),
        });
      }
      if (assistantMessages.length != 0) {
        messages.push({
          role: 'assistant',
          content: assistantMessages.shift(),
        });
      }
    }

    //create chat completion (openai api method)
    const completion = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    const story = completion.data.choices[0].message['content'];
    return { assistant: story };
  }

  async testPost(req): Promise<any> {
    return await req;
  }
}
