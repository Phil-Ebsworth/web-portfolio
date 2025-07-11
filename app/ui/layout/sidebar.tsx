'use client';

import { useRouter } from 'next/navigation';
import { Home, Files, User, Grid, LogIn, Music, Images, Martini, Sparkles} from "lucide-react"

import clsx from 'clsx';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { usePathname } from "next/navigation"
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { UserData } from '@/lib/definitions';
import { ProfileCard } from './profile-card';

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
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    const interval = setInterval(() => update(), 1000 * 60 * 60)
    return () => clearInterval(interval)
  }, [update])


  const userData: UserData = {
    id: session?.user.id || '',
    username: session?.user.name || '',
    password: '', // Password is not available in the session
    image: session?.user.image || '', // Use the image from the session
  };

  return (
    <Sidebar collapsible="icon" className="group-data-[side=left]:border-r-0">
      <SidebarHeader>
          <SidebarMenuButton asChild>
            <Link href="/" >
              <Sparkles className="size-4" />
              <span className="hidden sm:inline">Philip-Daniel Ebsworth</span>
            </Link>
          </SidebarMenuButton>
      </SidebarHeader>
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
            <SidebarSeparator />
            <SidebarMenu>
              {session?.user ? (
                ProfileCard({ user: userData}) // Pass the user data to the Profile component
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
      </SidebarFooter>
    </Sidebar>
  );
}