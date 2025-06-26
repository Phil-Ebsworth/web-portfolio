
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from '@/components/ui/menubar';

export const metadata: Metadata = {
  title: 'Cocktail Cosmos',
  description: 'Deine interaktive Cocktail-Karte für den Sommer',
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
     <main className="w-full flex flex-col items-center">
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger><Link href="/main/cocktail-cosmos">Home</Link></MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger><Link href="/main/cocktail-cosmos/search">Alle Cocktails</Link></MenubarTrigger>
            </MenubarMenu>
            
        </Menubar> {children}
      </main>
  );
}