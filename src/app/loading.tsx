import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const Avatar = () => (
  <Skeleton className="hidden sm:block size-8 shrink-0 rounded-full" />
);

const UserMessage = ({
  widths,
  delay = 0,
}: {
  widths: string[];
  delay?: number;
}) => (
  <div className="flex justify-end items-end gap-2">
    <div
      className="flex flex-col gap-2 rounded-2xl bg-muted/60 px-4 py-3 w-[70%] sm:w-72"
      style={{ animationDelay: `${delay}ms` }}
    >
      {widths.map((w, i) => (
        <Skeleton key={i} className={cn("h-4 rounded-md", w)} />
      ))}
    </div>
    <Avatar />
  </div>
);

const AssistantMessage = ({
  lines,
  withCode = false,
  delay = 0,
}: {
  lines: string[];
  withCode?: boolean;
  delay?: number;
}) => (
  <div className="flex items-start gap-2">
    <Avatar />
    <div
      className="flex flex-col gap-3 flex-1 max-w-2xl"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Reasoning trigger */}
      <Skeleton className="h-4 w-28 rounded-md" />

      {/* Text lines */}
      <div className="space-y-2">
        {lines.map((w, i) => (
          <Skeleton key={i} className={cn("h-4 rounded-md", w)} />
        ))}
      </div>

      {/* Code block */}
      {withCode && <Skeleton className="h-28 w-full rounded-lg" />}

      {/* Action row: copy / regenerate */}
      <div className="flex gap-1">
        <Skeleton className="size-7 rounded-md" />
        <Skeleton className="size-7 rounded-md" />
      </div>
    </div>
  </div>
);

export default function Loading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="flex flex-col h-[calc(100vh-60px)] bg-background"
    >
      <span className="sr-only">Loading chat...</span>

      {/* "New chat" button */}
      <div className="flex justify-end max-w-7xl w-full mx-auto px-2 sm:px-4 pt-2">
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      {/* Chat area */}
      <div className="flex-1 min-h-0 overflow-hidden max-w-7xl w-full mx-auto px-2 sm:px-4 md:px-6 pt-3">
        <div className="space-y-8">
          <UserMessage widths={["w-full", "w-2/3"]} />
          <AssistantMessage
            lines={["w-full", "w-full", "w-11/12", "w-3/4"]}
            withCode
            delay={150}
          />
          <UserMessage widths={["w-full"]} delay={300} />
          <AssistantMessage lines={["w-full", "w-5/6", "w-1/2"]} delay={450} />
        </div>
      </div>

      {/* Input footer */}
      <div className="border-t border-border bg-background w-full">
        <div className="max-w-5xl mx-auto px-2 sm:px-4 py-3">
          {/* Suggestions (mobile/tablet scroll row) */}
          <div className="lg:hidden flex gap-2 overflow-hidden pb-3">
            {["w-32", "w-40", "w-36", "w-28"].map((w, i) => (
              <Skeleton
                key={i}
                className={cn("h-8 shrink-0 rounded-full", w)}
              />
            ))}
          </div>

          {/* Prompt box: one rounded container like the real PromptInput */}
          <div className="rounded-xl border border-border bg-background p-3 space-y-3">
            {/* Textarea */}
            <Skeleton className="h-5 w-48 rounded-md" />
            <Skeleton className="h-5 w-24 rounded-md opacity-0 sm:opacity-100" />

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-md" /> {/* + attachments */}
                <Skeleton className="h-8 w-32 rounded-md" />{" "}
                {/* model select */}
              </div>
              <Skeleton className="size-8 rounded-lg" /> {/* submit */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
