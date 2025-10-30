"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { useChat } from "@ai-sdk/react";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Response } from "@/components/ai-elements/response";
import { Suggestion } from "@/components/ai-elements/suggestion";
import { models, suggestions } from "@/config";
import { Fragment, Key, useState } from "react";

const ChatPage = () => {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text) {
      return;
    }
    sendMessage({
      text: message.text,
    });
    setInput("");
  };

  const handleSuggestionClick = (suggestion: string) => {};

  return (
    <div className="flex flex-col h-screen max-w-7xl mx-auto relative bg-background">
      {/* Scrollable message area */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-[200px]">
        <Conversation>
          <ConversationContent>
            {messages.map(
              (message: {
                id: Key | null | undefined;
                parts: any[];
                role: string;
              }) => (
                <div key={message.id}>
                  {message.parts.map(
                    (
                      part: { type: any; text: string | null | undefined },
                      i: any
                    ) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <Fragment key={`${message.id}-${i}`}>
                              <Message
                                from={
                                  message.role as
                                    | "system"
                                    | "user"
                                    | "assistant"
                                }
                              >
                                <MessageContent>
                                  <Response>{part.text}</Response>
                                </MessageContent>
                              </Message>
                            </Fragment>
                          );
                        default:
                          return null;
                      }
                    }
                  )}
                </div>
              )
            )}
            {(status === "submitted" || status === "streaming") && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      {/* Fixed input footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
        <div className="max-w-5xl mx-auto px-4 pt-3 pb-4">
          {/* Suggestions above input */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-3">
            {suggestions.map((suggestion) => (
              <Suggestion
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                suggestion={suggestion}
              />
            ))}
          </div>

          {/* Input area */}
          <PromptInput globalDrop multiple onSubmit={handleSubmit}>
            <PromptInputHeader></PromptInputHeader>

            <PromptInputBody>
              <PromptInputTextarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </PromptInputBody>

            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
              </PromptInputTools>

              <PromptInputSubmit disabled={!input && !status} status={status} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
