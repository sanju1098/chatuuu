"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full  flex flex-col justify-center items-center gap-3">
          <Skeleton className="h-150 w-250 " />
        </div>
      </div>

      <div className="w-full border-t bg-background/60 backdrop-blur-sm py-4 flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2 px-4 max-w-3xl">
          <Skeleton className="h-8 w-64 rounded-full" />
          <Skeleton className="h-8 w-72 rounded-full" />
        </div>

        {/* Input Box */}
        <div className="w-full max-w-3xl flex items-end justify-between gap-2 px-4">
          <Skeleton className="h-28 flex-1 rounded-2xl" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
