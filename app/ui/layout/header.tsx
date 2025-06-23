'use client';

import { ThemeProvider } from "@/app/ui/layout/theme-provider"
import { SidebarProvider, SidebarTrigger, SidebarInset, useSidebar } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { usePathname } from 'next/navigation';
import { GithubButton, ModeToggle } from '@/app/ui/layout/icons';
import Structure from "./structure";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarInset>
            <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
              <div className="flex gap-4 items-center flex-1">
                <SidebarTrigger className="scale-150" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4 bg-gray-400"
                />
                <Structure path={pathname} />
              </div>
              <div className="flex items-center gap-4">
              <GithubButton />
              <ModeToggle />
              </div>
            </header>
          </SidebarInset>
    </header>
  );
}
