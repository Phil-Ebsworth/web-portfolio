"use client"

import '@/app/ui/global.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import * as React from "react"
import { ThemeProvider } from "@/app/ui/theme-provider"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/ui/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Phil Ebsworth's Portfolio - Full Stack Developer" />
      <meta name="keywords" content="Phil Ebsworth, Full Stack Developer, Portfolio, React, Next.js, TypeScript" />
      <meta name="author" content="Phil Ebsworth" />
      </head>
      <body suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider >
          <AppSidebar variant="inset" collapsible='icon' className="border border-none rounded-r-xl shadow-md bg-white/5 h-screen w-52" />
          <SidebarInset>
            <header className="flex h-14 shrink-0 items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex gap-4 items-center flex-1">
                <SidebarTrigger className="scale-150" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4 bg-gray-400"
                />
                <h1 className="text-lg font-semibold">{pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)}</h1>
              </div>
              <Button variant="ghost" asChild size="icon" className="hidden sm:flex p-0 scale-125">
                <a
                  href="https://github.com/Phil-Ebsworth"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="GitHub"
                  className="dark:text-foreground flex items-center justify-center w-12 h-12"
                >
                  <img
                    src="/github-mark-white.svg"
                    alt="GitHub"
                    className="w-5 h-5"
                    style={{ display: "block" }}
                  />
                </a>
              </Button>
            </header>
            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
      <SpeedInsights />
      </body>
    </html>
  );
}