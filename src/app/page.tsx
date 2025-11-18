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
import { models } from "@/config";
import { Fragment, Key, useEffect, useMemo, useRef, useState } from "react";
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
import { randomSuggestions } from "@/config/suggestions";
import { DefaultChatTransport } from "ai";

const ChatUIPage = () => {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].id);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const handleSubmit = (message: PromptInputMessage) => {
    setInput("");
    const hasText = !!message.text && message.text.trim() !== "";
    const hasFiles = Array.isArray(message.files) && message.files.length > 0;

    if (!hasText && !hasFiles) return;

    const result = sendMessage({
      text: message.text ?? "",
      files: message.files,
    });

    if (result && typeof (result as Promise<any>).then === "function") {
      return (result as Promise<any>).then(() => setInput(""));
    }

    return result;
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const messageReasoning = {
    duration: 2.0,
    content:
      "Static reasoning: I referenced docs and prior examples to craft this response.",
  };
  const messageSource = {
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

  const randoms = useMemo(() => randomSuggestions(), []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-6 bg-background max-w-7xl w-full mx-auto pt-3 h-[70vh] sm:h-[75vh] md:h-[78vh]">
        <Conversation>
          <ConversationContent>
            {messages.map(
              (message: {
                id: Key | null | undefined;
                parts: any[];
                role: string;
              }) => (
                <div key={message.id}>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <Fragment key={`${message.id}-${i}`}>
                            <Message
                              from={
                                message.role as "system" | "user" | "assistant"
                              }
                            >
                              <MessageContent>
                                {/* {message.role !== "user" && (
                                  <Reasoning
                                    duration={messageReasoning.duration}
                                  >
                                    <ReasoningTrigger />
                                    <ReasoningContent>
                                      {messageReasoning.content}
                                    </ReasoningContent>
                                  </Reasoning>
                                )} */}

                                <Response>{part.text}</Response>

                                {/* {message.role !== "user" &&
                                  status === "ready" && (
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
                                  )} */}
                              </MessageContent>

                              {message.role === "user" ? (
                                <div className="hidden sm:block mr-2 shrink-0 self-end">
                                  <MessageAvatar
                                    name="ME"
                                    src="https://github.com/haydenbleasel.png"
                                  />
                                </div>
                              ) : (
                                <div className="hidden sm:block mr-2 shrink-0 self-start">
                                  <MessageAvatar
                                    name="AI"
                                    src="https://github.com/openai.png"
                                  />
                                </div>
                              )}
                            </Message>
                          </Fragment>
                        );

                      // File attachments (images, PDFs)
                      case "file":
                        return (
                          <div
                            key={`${message.id}-${i}`}
                            className="flex justify-end gap-0"
                          >
                            {part.mediaType?.startsWith("image/") ? (
                              <img
                                src={part.url}
                                alt={part.filename ?? `attachment-${i}`}
                                className="rounded-lg max-w-xs border my-2"
                              />
                            ) : part.mediaType?.startsWith(
                                "application/pdf"
                              ) ? (
                              <iframe
                                src={part.url}
                                width="400"
                                height="500"
                                title={part.filename ?? `attachment-${i}`}
                                className="border rounded-lg my-2"
                              />
                            ) : null}
                          </div>
                        );

                      default:
                        return null;
                    }
                  })}
                </div>
              )
            )}

            {(status === "submitted" || status === "streaming") && (
              <Loader size={24} />
            )}
            <div ref={messagesEndRef} />
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      {/* Input Footer */}
      <div className="border-t border-border bg-background w-full">
        <div className="max-w-5xl mx-auto px-2 sm:px-4 py-3">
          {/* Suggestions */}
          <div className="hidden lg:flex flex-wrap justify-center items-center gap-2 mb-3">
            {messages.length === 0 &&
              randoms.map((suggestion: any) => (
                <Suggestion
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  suggestion={suggestion}
                />
              ))}
          </div>

          {/* Prompt Input Area */}
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
                placeholder="Type your message or attach files..."
              />
            </PromptInputBody>

            <PromptInputFooter className="flex flex-wrap gap-2 sm:gap-3">
              <PromptInputTools className="flex items-center gap-1 sm:gap-2">
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>

                {/* <PromptInputButton variant="ghost">
                  <MicIcon size={16} />
                </PromptInputButton>

                <PromptInputButton variant="ghost">
                  <GlobeIcon size={16} />
                </PromptInputButton> */}

                <PromptInputModelSelect onValueChange={setModel} value={model}>
                  <PromptInputModelSelectTrigger>
                    <PromptInputModelSelectValue />
                  </PromptInputModelSelectTrigger>
                  <PromptInputModelSelectContent>
                    {models.map((model) => (
                      <PromptInputModelSelectItem
                        key={model.id}
                        value={model.id}
                        disabled={model.disabled}
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

export default ChatUIPage;
