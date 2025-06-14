'use client';

import { useRouter } from 'next/navigation';
import { Home, Search, Settings, Files, User, Grid } from "lucide-react"

import clsx from 'clsx';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { usePathname } from "next/navigation"
import Link from 'next/link';

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Files,
  },
  {
    title: "About",
    url: "/about",
    icon: User,
  },
  {
    title: "Tick-Tack-Toe",
    url: "/tick-tack-toe",
    icon: Grid,
  },
  {
    title: "Tick-Tack-Toe online",
    url: "/games",
    icon: Grid,
  },
]

export function AppSidebar() {
  const router = useRouter();
const pathname = usePathname()
  return (
    <Sidebar collapsible="icon" className="group-data-[side=left]:border-r-0">
      <SidebarContent>
      <SidebarGroup>
      <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
        <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
        <Link
          key={item.title}
          href={item.url}
          className={clsx("text-gray-400",
          {
          'text-gray-200': pathname === item.url,
          },
          )}
        >
          <item.icon />
          <span>{item.title}</span>
        </Link>
        </SidebarMenuButton>
        </SidebarMenuItem>
        ))}
      </SidebarMenu>
      </SidebarGroupContent>
      </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
      <SidebarGroup>
      <SidebarGroupLabel>Settings</SidebarGroupLabel>
      <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
        <SidebarMenuButton asChild>
        <Link href="/settings">
        <Settings />
        <span>Settings</span>
        </Link>
        </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      </SidebarGroupContent>
      </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}