import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ModelType, Message } from '../types';

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends a message to the Gemini API and yields chunks of the response text.
 * Handles both standard chat and specific specialized tasks.
 */
export async function* streamGeminiResponse(
  model: ModelType,
  history: Message[],
  newMessage: string,
  systemInstruction?: string,
  imageData?: string, // Base64 string for vision tasks
  imageMimeType?: string
): AsyncGenerator<string, void, unknown> {

  // For Image Generation specifically
  if (model === ModelType.IMAGE_GEN && !imageData) {
    // We treat "Chatting" with the Image Gen model without input image as a generation request
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: {
          parts: [{ text: newMessage }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1", 
          }
        }
      });

      // Check for generated image in response
      // As per instructions: iterate through parts to find image
      const parts = response.candidates?.[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData) {
            yield `![Generated Image](data:image/png;base64,${part.inlineData.data})`;
          } else if (part.text) {
            yield part.text;
          }
        }
      }
    } catch (error) {
      console.error("Image Gen Error:", error);
      yield "Sorry, I encountered an error generating the image.";
    }
    return;
  }

  // For Standard Chat / Vision / Coding
  try {
    // Construct the active chat history for context
    // We filter out loading states or empty messages
    const validHistory = history.filter(h => !h.isLoading && h.text);
    
    // Note: The new SDK Chat API is powerful, but for simple "stateless" functional style 
    // where we manage history manually in the frontend, we can also use generateContentStream 
    // by passing the full history as 'contents'. 
    // However, `chats.create` is cleaner for text turns.
    
    // If we have an image attachment (Vision capabilities)
    if (imageData && imageMimeType) {
        // Vision requests usually are single-turn or specialized. 
        // We'll use generateContentStream with the image and prompt.
        const response = await ai.models.generateContentStream({
            model: model,
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: imageData,
                            mimeType: imageMimeType
                        }
                    },
                    { text: newMessage }
                ]
            },
            config: {
                systemInstruction: systemInstruction
            }
        });

        for await (const chunk of response) {
            yield chunk.text || '';
        }
        return;
    }

    // Standard Text Chat
    const chat = ai.chats.create({
      model: model,
      history: validHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      })),
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const result = await chat.sendMessageStream({ message: newMessage });

    for await (const chunk of result) {
       // chunk is GenerateContentResponse
       const responseChunk = chunk as GenerateContentResponse;
       yield responseChunk.text || '';
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    yield "I'm having trouble connecting to the service right now. Please check your connection or API key.";
  }
}