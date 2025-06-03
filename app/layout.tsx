"use client"

import '@/app/global.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/header"



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Phil Ebsworth's Portfolio - Full Stack Developer" />
      <meta name="keywords" content="Phil Ebsworth, Full Stack Developer, Portfolio, React, Next.js, TypeScript" />
      <meta name="author" content="Phil Ebsworth" />
      <head />
      <body >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <SidebarProvider defaultOpen={false}>
              <AppSidebar />
            <main className="flex w-full flex-col items-center justify-center min-h-screen min-w-screen ">
              <SiteHeader />
              {children}
            </main>
            </SidebarProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}