"use client"

import '@/app/ui/global.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import * as React from "react"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/ui/layout/sidebar"
import { Header } from '@/app/ui/layout/header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div suppressHydrationWarning>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
      <SpeedInsights />
    </div>
  );
}