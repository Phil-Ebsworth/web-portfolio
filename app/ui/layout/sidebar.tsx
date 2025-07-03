'use client';

import { useRouter } from 'next/navigation';
import { Home, Settings, Files, User, Grid, LogIn, LogOut, Music, Images, Martini, ChevronsUpDown, Sparkles, BadgeCheck, CreditCard, Bell } from "lucide-react"

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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

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
    // TIP: You can also use `navigator.onLine` and some extra event handlers
    // to check if the user is online and only update the session if they are.
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
    const interval = setInterval(() => update(), 1000 * 60 * 60)
    return () => clearInterval(interval)
  }, [update])

  // Listen for when the page is visible, if the user switches tabs
  // and makes our tab visible again, re-fetch the session
  useEffect(() => {
    const visibilityHandler = () =>
      document.visibilityState === "visible" && update()
    window.addEventListener("visibilitychange", visibilityHandler, false)
    return () =>
      window.removeEventListener("visibilitychange", visibilityHandler, false)
  }, [update])
  // Determine if the screen is mobile-sized
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

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
              {session?.user ? (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/main/auth/profile">
                      <User />
                      <span>profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (null)}
              {session?.user ? (
                <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={session.user.image} alt={session.user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{session.user.name}</span>
                <span className="truncate text-xs">{session.user.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={session.user.image} alt={session.user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{session.user.name}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SidebarMenuButton onClick={() => signOut()} asChild>
                    <Link href="#">
                      <LogOut />
                      <span>Log out</span>
                    </Link>
                  </SidebarMenuButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
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