"use client";

import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@repo/ui/components/ui/sonner";
import { QueryProvider } from "./query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <QueryProvider>{children}</QueryProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
}
