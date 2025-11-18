"use client";

import { PropsWithChildren, Suspense, useEffect } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider as UiProvider } from "src/components/ui/provider";
import { Footer } from "components/Footer";
import { instrumentBrowserOtel } from "src/instrumentBrowserOtel";

function OtelInit() {
  useEffect(() => {
    // Initialize browser OpenTelemetry only on the client
    instrumentBrowserOtel().catch(() => {
      // ignore errors in initialization to avoid blocking the UI
    });
  }, []);
  return null;
}

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <ClerkProvider afterSignOutUrl="/">
        <UiProvider enableSystem>
          <OtelInit />
          <div style={{ overflow: "auto", flex: 1 }}>{children}</div>
          <Footer />
        </UiProvider>
      </ClerkProvider>
    </Suspense>
  );
}
