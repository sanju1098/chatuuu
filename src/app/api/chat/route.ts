import { streamText, UIMessage, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";

const systemPrompt = `You are a helpful AI assistant. When providing information from external sources or references, please include citations in this format within your response:

[Source: Title - URL]

For example: [Source: React Documentation - https://react.dev/reference/react]

Always cite your sources when referencing external knowledge.`;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages: convertToModelMessages(messages),
      system: systemPrompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to stream chat completion" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
