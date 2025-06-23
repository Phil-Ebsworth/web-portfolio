"use client"

import '@/app/ui/global.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import * as React from "react"
import { ThemeProvider } from "@/app/ui/theme-provider"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/ui/sidebar"
import { Header } from '@/app/ui/header';
import { SessionProvider } from 'next-auth/react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
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