import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
// import { ModeToggle } from "@/components/ui/mode-toggle";
import { ApiProvider } from "@/components/ApiProvider";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex-col flex",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <div className="fixed top-2 right-2">
            <ModeToggle />
          </div> */}
          <ApiProvider>{children}</ApiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
