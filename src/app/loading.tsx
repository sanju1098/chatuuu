"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col h-[calc(100vh-60px)] bg-background">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-6 pt-3">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* User Message Skeleton */}
          <div className="flex justify-end gap-2">
            <div className="flex flex-col gap-2 max-w-xs">
              <Skeleton className="h-12 w-48 rounded-lg" />
              <Skeleton className="h-10 w-40 rounded-lg" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          {/* AI Message Skeleton */}
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-2 max-w-md flex-1">
              <Skeleton className="h-6 w-32 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
              </div>
            </div>
          </div>

          {/* User Message Skeleton */}
          <div className="flex justify-end gap-2">
            <div className="flex flex-col gap-2 max-w-xs">
              <Skeleton className="h-10 w-56 rounded-lg" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          {/* AI Message Skeleton - Loading */}
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-2 max-w-md flex-1">
              <Skeleton className="h-6 w-24 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background w-full">
        <div className="max-w-5xl mx-auto px-2 sm:px-4 py-3">
          {/* Suggestions */}
          <div className="hidden lg:flex flex-wrap justify-center gap-2 mb-3">
            <Skeleton className="h-8 w-32 rounded-full" />
            <Skeleton className="h-8 w-40 rounded-full" />
            <Skeleton className="h-8 w-36 rounded-full" />
          </div>

          {/* Input Box */}
          <div className="space-y-3">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <div className="flex items-center justify-end gap-2">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-12 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
