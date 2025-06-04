"use client"

import '@/app/global.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-lg font-semibold">Projects</h1>
            <h1 className="text-lg font-semibold">Projects</h1>
          </div>
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