"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ai-elements/message";
import { useChat } from "@ai-sdk/react";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Response } from "@/components/ai-elements/response";
import { Suggestion } from "@/components/ai-elements/suggestion";
import { models, suggestions } from "@/config";
import { Fragment, Key, useState } from "react";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import { GlobeIcon, MicIcon } from "lucide-react";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].id);

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

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const messageReasoning: { duration: number; content: string } = {
    duration: 2.0,
    content:
      "Static reasoning: I referenced docs and prior examples to craft this response.",
  };
  const messageSource: { sources: { href: string; title: string }[] } = {
    sources: [
      {
        href: "https://react.dev/reference/react",
        title: "React Documentation",
      },
      {
        href: "https://react.dev/reference/react-dom",
        title: "React DOM Documentation",
      },
    ],
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto px-6 h-[70vh] bg-background w-7xl mx-auto pt-3">
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
                                  {message.role !== "user" && (
                                    <Reasoning
                                      duration={messageReasoning.duration}
                                    >
                                      <ReasoningTrigger />
                                      <ReasoningContent>
                                        {messageReasoning.content}
                                      </ReasoningContent>
                                    </Reasoning>
                                  )}

                                  <Response>{part.text}</Response>
                                  {message.role !== "user" && (
                                    <Sources>
                                      <SourcesTrigger
                                        count={messageSource.sources.length}
                                      />
                                      <SourcesContent>
                                        {messageSource.sources.map((source) => (
                                          <Source
                                            href={source.href}
                                            key={source.href}
                                            title={source.title}
                                          />
                                        ))}
                                      </SourcesContent>
                                    </Sources>
                                  )}
                                </MessageContent>
                                {message.role === "user" ? (
                                  <div className="mr-2 shrink-0 self-end">
                                    <MessageAvatar
                                      name="ME"
                                      src="https://github.com/haydenbleasel.png"
                                    />
                                  </div>
                                ) : (
                                  <div className="mr-2 shrink-0 self-start">
                                    <MessageAvatar
                                      name="AI"
                                      src="https://github.com/openai.png"
                                    />
                                  </div>
                                )}
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
            {(status === "submitted" || status === "streaming") && (
              <Loader size={32} />
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      {/* Fixed input footer */}
      <div
        className="border-t border-border bg-background"
        // className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-0"
      >
        <div className="max-w-5xl mx-auto px-4 py-3">
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
            <PromptInputHeader>
              <PromptInputAttachments>
                {(attachment: any) => (
                  <PromptInputAttachment data={attachment} />
                )}
              </PromptInputAttachments>
            </PromptInputHeader>

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

                <PromptInputButton variant={"ghost"}>
                  <MicIcon size={16} />
                </PromptInputButton>

                <PromptInputButton variant={"ghost"}>
                  <GlobeIcon size={16} />
                </PromptInputButton>

                <PromptInputModelSelect onValueChange={setModel} value={model}>
                  <PromptInputModelSelectTrigger>
                    <PromptInputModelSelectValue />
                  </PromptInputModelSelectTrigger>
                  <PromptInputModelSelectContent>
                    {models.map((model) => (
                      <PromptInputModelSelectItem
                        key={model.id}
                        value={model.id}
                      >
                        {model.name}
                      </PromptInputModelSelectItem>
                    ))}
                  </PromptInputModelSelectContent>
                </PromptInputModelSelect>
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
