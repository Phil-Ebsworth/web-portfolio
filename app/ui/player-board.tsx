import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Circle, User, MessageCircleMore } from 'lucide-react';

import { useEffect, useState } from 'react';

export function PlayerBoard({ playerName, role }: { playerName: string | null; role: "X" | "O" }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                {role ===  'X' ? <AvatarFallback className="rounded-lg"><X/></AvatarFallback> : <AvatarFallback className="rounded-lg"><Circle/></AvatarFallback>}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{playerName ? playerName : "Gast"}</span>
                <span className="text-muted-foreground truncate text-xs">
                  Spielt als X
                </span>
              </div>
              {/* <IconDotsVertical className="ml-auto size-4" /> */}
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
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                {role ===  'X' ? <AvatarFallback className="rounded-lg"><X/></AvatarFallback> : <AvatarFallback className="rounded-lg"><Circle/></AvatarFallback>}
              </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{playerName ? playerName : "Gast"}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageCircleMore />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
    );
}