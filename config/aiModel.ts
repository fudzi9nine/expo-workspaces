import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.EXPO_PUBLIC_OPENAI_KEY,
  defaultHeaders: {
    'Content-Type': 'application/json'
  }
});

export default async function sendMessageToAI(prompt: string) {
  return await openai.chat.completions.create({
    model: 'deepseek/deepseek-r1:free',

    messages: [
      {
        role: 'user',
        content: '/reset context\n\n' + prompt
      }
    ]
  });
}
