import { ApiProvider } from "@/components/ApiProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex-col flex",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MantineProvider>
            <ApiProvider>{children}</ApiProvider>
          </MantineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
