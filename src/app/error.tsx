"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error caught by boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 px-4">
      <div className="w-full max-w-2xl bg-background border rounded-2xl shadow-sm p-8 animate-fade-in">
        {/* Header section */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 text-red-600 p-2 rounded-full">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">
            Oops, something went wrong!
          </h1>
        </div>

        {/* Message section */}
        <div className="text-muted-foreground mb-6 leading-relaxed">
          <p>
            We encountered an unexpected issue while loading this page. Don’t
            worry — you can try again below.
          </p>
          <p className="mt-2 text-sm italic text-foreground/70">
            <strong>Error message:</strong> {error.message}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => reset()}
            className="rounded-full"
          >
            <RefreshCcw className="w-4 h-4 mr-2" /> Reload Page
          </Button>
        </div>
      </div>

      {/* Footer tone similar to ChatGPT */}
      <p className="text-xs text-muted-foreground mt-6">
        Chatuuu Interface — powered by Next.js Error Boundary
      </p>
    </div>
  );
}
