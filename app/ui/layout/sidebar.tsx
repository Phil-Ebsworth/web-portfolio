'use client';

import { useRouter } from 'next/navigation';
import { Home, Settings, Files, User, Grid, LogIn, LogOut, Music, Images, Martini } from "lucide-react"

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
import { signOut, useSession } from 'next-auth/react';

const items = [
  {
    title: "Home",
    url: "/main/start",
    icon: Home,
  },
  {
    title: "Projects",
    url: "/main/projects",
    icon: Files,
  },
  {
    title: "Tick-Tack-Toe",
    url: "/main/tick-tack-toe",
    icon: Grid,
  },
  {
    title: "Tab-Bibliothek",
    url: "/main/tab-bib",
    icon: Music,
  },
  {
    title: "Showcase",
    url: "/main/showcase",
    icon: Images,
  },
  {
    title: "Cocktail Cosmos",
    url: "/main/cocktail-cosmos",
    icon: Martini,
  },
  {
    title: "About",
    url: "/main/about",
    icon: User,
  },
]

export function AppSidebar() {
  const { data: session } = useSession();
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
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/main/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              {session?.user ? (
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => signOut()} asChild>
                    <Link href="#">
                      <LogOut />
                      <span>Logout</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/main/auth/login">
                      <LogIn />
                      <span>Login</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}