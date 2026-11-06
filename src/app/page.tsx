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
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { suggestions } from "@/config/suggestions";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type ChatStatus, type UIMessage } from "ai";
import {
  AlertCircle,
  Check,
  Copy,
  File as FileIcon,
  GlobeIcon,
  MicIcon,
  Plus,
  RefreshCcw,
} from "lucide-react";
import { toast } from "sonner";
import { ChatAvatar } from "@/components/chat-avatar";

const STORAGE_KEY = "chat-messages";

type SourceItem = { title: string; href: string };

const SOURCE_REGEX = /\[Source:\s*(.+?)\s+-\s+(https?:\/\/[^\]\s]+)\]/g;

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((p) => p.type === "text")
    .map((p) => (p as { text: string }).text)
    .join("\n");
}

function getMessageSources(message: UIMessage): SourceItem[] {
  const found: SourceItem[] = [];

  // Native AI SDK source parts
  for (const part of message.parts) {
    if (part.type === "source-url") {
      const p = part as { url: string; title?: string };
      found.push({ title: p.title ?? p.url, href: p.url });
    }
  }

  // Fallback: "[Source: Title - https://...]" in text
  const text = getMessageText(message);
  for (const match of text.matchAll(SOURCE_REGEX)) {
    found.push({ title: match[1].trim(), href: match[2].trim() });
  }

  // de-duplicate by href
  return Array.from(new Map(found.map((s) => [s.href, s])).values());
}

type ChatMessageProps = {
  message: UIMessage;
  isLast: boolean;
  status: ChatStatus;
  onRegenerate: () => void;
};

const ChatMessage = memo(
  function ChatMessage({
    message,
    isLast,
    status,
    onRegenerate,
  }: ChatMessageProps) {
    const [copied, setCopied] = useState(false);
    const isUser = message.role === "user";
    const isStreamingThis = isLast && status === "streaming";
    const sources = useMemo(
      () => (!isUser && !isStreamingThis ? getMessageSources(message) : []),
      [message, isUser, isStreamingThis],
    );

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(getMessageText(message));
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        toast.error("Could not copy to clipboard");
      }
    };

    return (
      <Message from={message.role}>
        <MessageContent>
          {message.parts.map((part, i) => {
            const key = `${message.id}-${i}`;

            switch (part.type) {
              case "reasoning":
                return (
                  <Reasoning
                    key={key}
                    isStreaming={
                      isStreamingThis && i === message.parts.length - 1
                    }
                  >
                    <ReasoningTrigger />
                    <ReasoningContent>{part.text}</ReasoningContent>
                  </Reasoning>
                );

              case "text":
                return <Response key={key}>{part.text}</Response>;

              case "file": {
                const mediaType = part.mediaType ?? "";
                if (mediaType.startsWith("image/")) {
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={key}
                      src={part.url}
                      alt={part.filename ?? `attachment-${i}`}
                      className="rounded-lg max-w-xs border border-border"
                    />
                  );
                }
                if (mediaType === "application/pdf" && part.url) {
                  return (
                    <iframe
                      key={key}
                      src={part.url}
                      title={part.filename ?? `attachment-${i}`}
                      className="w-full max-w-md h-52 border border-border rounded-lg"
                    />
                  );
                }
                return (
                  <div
                    key={key}
                    className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-muted max-w-sm text-sm"
                  >
                    <FileIcon className="size-4 shrink-0" />
                    <span className="truncate">
                      {part.filename ?? "Attachment"}
                    </span>
                  </div>
                );
              }

              default:
                return null;
            }
          })}

          {sources.length > 0 && (
            <Sources>
              <SourcesTrigger count={sources.length} />
              <SourcesContent>
                {sources.map((source, i) => (
                  <Source
                    key={`${source.href}-${i}`}
                    href={source.href}
                    title={source.title}
                  />
                ))}
              </SourcesContent>
            </Sources>
          )}

          {!isUser && !isStreamingThis && getMessageText(message) && (
            <div className="flex items-center gap-1 mt-2 -ml-2">
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={handleCopy}
                aria-label="Copy message"
              >
                {copied ? (
                  <Check className="size-3.5" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </Button>
              {isLast && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={onRegenerate}
                  aria-label="Regenerate response"
                >
                  <RefreshCcw className="size-3.5" />
                </Button>
              )}
            </div>
          )}
        </MessageContent>

        <ChatAvatar role={message.role} className="hidden sm:flex" />
      </Message>
    );
  },
  (prev, next) =>
    prev.message === next.message &&
    prev.isLast === next.isLast &&
    // status only matters for the last message
    (!next.isLast || prev.status === next.status),
);

const ChatUIPage = () => {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].id);
  const [hydrated, setHydrated] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    messages,
    setMessages,
    sendMessage,
    regenerate,
    stop,
    status,
    error,
  } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isSubmitting = status === "submitted" || status === "streaming";

  // Load persisted chat once
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, [setMessages]);

  // Persist when a response is finished
  useEffect(() => {
    if (!hydrated || status !== "ready") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* quota exceeded (e.g. large attachments) - ignore */
    }
  }, [messages, status, hydrated]);

  useEffect(() => {
    if (error) {
      toast.error("API Error", {
        description: String(error.message ?? error),
      });
    }
  }, [error]);

  const handleSubmit = useCallback(
    (message: PromptInputMessage) => {
      const hasText = !!message.text?.trim();
      const hasFiles = !!message.files?.length;
      if (!hasText && !hasFiles) return;

      sendMessage(
        { text: message.text ?? "", files: message.files },
        { body: { model } },
      );
      setInput("");
      inputRef.current?.focus();
    },
    [sendMessage, model],
  );

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const handleNewChat = () => {
    stop();
    setMessages([]);
    setInput("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    inputRef.current?.focus();
  };

  const handleRegenerate = useCallback(
    () => regenerate({ body: { model } }),
    [regenerate, model],
  );

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
      {/* Header */}
      {!isEmpty && (
        <div className="flex justify-end max-w-7xl w-full mx-auto px-2 sm:px-4 pt-2">
          <Button variant="outline" size="sm" onClick={handleNewChat}>
            <Plus className="size-4 mr-1" />
            New chat
          </Button>
        </div>
      )}

      {/* Chat area */}
      <div className="flex-1 min-h-0 flex flex-col max-w-7xl w-full mx-auto px-2 sm:px-4 md:px-6 bg-background">
        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 px-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold">
                How can I help you today?
              </h1>
              <p className="text-muted-foreground mt-2">
                Ask a question or attach a file to get started.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
              {suggestions.map((suggestion: string) => (
                <Suggestion
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  suggestion={suggestion}
                />
              ))}
            </div>
          </div>
        ) : (
          <Conversation className="h-full">
            <ConversationContent
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isLast={index === messages.length - 1}
                  status={status}
                  onRegenerate={handleRegenerate}
                />
              ))}

              {status === "submitted" && <Loader size={24} />}

              {error && !isSubmitting && (
                <div className="flex items-center gap-3 border border-destructive/40 bg-destructive/10 text-destructive rounded-lg px-3 py-2 text-sm">
                  <AlertCircle className="size-4 shrink-0" />
                  <span className="flex-1">
                    Something went wrong. {String(error.message ?? "")}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRegenerate}
                  >
                    Retry
                  </Button>
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        )}
      </div>

      {/* Input footer */}
      <div className="border-t border-border bg-background w-full">
        <div className="max-w-5xl mx-auto px-2 sm:px-4 py-3">
          {/* Mobile / tablet suggestions: horizontal scroll */}
          {isEmpty && (
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 -mx-2 px-2 [scrollbar-width:none]">
              {suggestions.map((suggestion: string) => (
                <div key={suggestion} className="shrink-0">
                  <Suggestion
                    onClick={() => handleSuggestionClick(suggestion)}
                    suggestion={suggestion}
                  />
                </div>
              ))}
            </div>
          )}

          <PromptInput
            globalDrop
            multiple
            accept="image/*,application/pdf"
            maxFiles={5}
            maxFileSize={10 * 1024 * 1024}
            onError={(err: { code: string; message: string }) =>
              toast.error("Attachment error", { description: err.message })
            }
            onSubmit={handleSubmit}
          >
            <PromptInputHeader>
              <PromptInputAttachments>
                {(attachment) => <PromptInputAttachment data={attachment} />}
              </PromptInputAttachments>
            </PromptInputHeader>

            <PromptInputBody>
              <PromptInputTextarea
                ref={inputRef}
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

                <PromptInputButton variant="ghost" disabled>
                  <MicIcon size={16} />
                </PromptInputButton>

                <PromptInputButton variant="ghost" disabled>
                  <GlobeIcon size={16} />
                </PromptInputButton>

                <PromptInputModelSelect onValueChange={setModel} value={model}>
                  <PromptInputModelSelectTrigger>
                    <PromptInputModelSelectValue />
                  </PromptInputModelSelectTrigger>
                  <PromptInputModelSelectContent>
                    {models.map((m) => (
                      <PromptInputModelSelectItem
                        key={m.id}
                        value={m.id}
                        disabled={m.disabled}
                      >
                        {m.name}
                      </PromptInputModelSelectItem>
                    ))}
                  </PromptInputModelSelectContent>
                </PromptInputModelSelect>
              </PromptInputTools>

              {/* No onStop prop exists: intercept the click while streaming */}
              <PromptInputSubmit
                status={status}
                onClick={(e) => {
                  if (isSubmitting) {
                    e.preventDefault();
                    stop();
                  }
                }}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
};

export default ChatUIPage;
