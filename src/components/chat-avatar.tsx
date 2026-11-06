import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatAvatarProps = {
  role: "user" | "assistant" | "system";
  className?: string;
};

export function ChatAvatar({ role, className }: ChatAvatarProps) {
  const isUser = role === "user";

  return (
    <Avatar className={cn("size-8 shrink-0 ring-1 ring-border", className)}>
      <AvatarFallback
        className={cn(
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground",
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </AvatarFallback>
    </Avatar>
  );
}
