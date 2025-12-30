
import { GoogleGenAI, Type } from "@google/genai";
import { Interest, Idea, AppSettings } from "../types";

export const generateDailyIdeas = async (interests: Interest[], settings: AppSettings): Promise<Idea[]> => {
  if (interests.length === 0) return [];

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const interestsContext = interests
    .map(i => `技术: ${i.techNames.join(', ')}。背景: ${i.description}`)
    .join('\n---\n');

  const vibePrompt = settings.vibeCodingMode 
    ? "Vibe Coding 友好：代码结构简单，核心逻辑清晰，非常适合使用 AI 一次性生成。且初步开发应能在 1 小时内完成。" 
    : "";

  const languagePrompt = settings.language === 'en-US' ? "Please respond in English." : "请使用中文进行回答。";

  const prompt = `
    你是一个顶级的产品经理和全栈工程师。请根据以下用户的技术兴趣，生成3个【高实用性】的产品创意。
    
    创意标准：
    1. ${vibePrompt}
    2. 极简 MVP：功能聚焦，不堆砌复杂架构。
    3. 解决真实痛点：解决生活中或工作中能立刻用上的小工具。
    4. 技术栈匹配：优先利用用户提到的技术。

    用户兴趣背景:
    ${interestsContext}

    ${languagePrompt}
    请返回 JSON 格式结果。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: settings.creativityLevel,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
              category: { type: Type.STRING },
              potentialImpact: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
            },
            required: ["title", "description", "techStack", "category", "potentialImpact"],
          },
        },
      },
    });

    const results = JSON.parse(response.text || '[]');
    return results.map((item: any) => ({
      ...item,
      id: Math.random().toString(36).substring(7),
      isLiked: false,
      isSaved: false,
      isImplemented: false,
      sourceInterestId: interests[Math.floor(Math.random() * interests.length)].id,
      generatedAt: Date.now(),
    }));
  } catch (error: any) {
    console.error("生成创意时出错:", error);
    return [];
  }
};
