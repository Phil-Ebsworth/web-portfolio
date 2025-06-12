"use client"

import '@/app/ui/global.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import * as React from "react"
import { ThemeProvider } from "@/app/ui/theme-provider"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/ui/sidebar"
import { Header } from './ui/header';



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
          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset>
              <Header />
              <main className="flex">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}

