import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink
} from '@/components/ui/navigation-menu'; // Replace with the actual library or file path
import { Separator } from '@/components/ui/separator'; // Replace with the actual library or file path
import Link from 'next/link';

export default function Navigation() {
    return (
        <NavigationMenu >
                <NavigationMenuList>
                    <NavigationMenuItem className="">
                            <Link href="/about" passHref>
                                <span className="text-lg font-semibold ml-2 mr-2">Profil</span>
                            </Link>
                    </NavigationMenuItem>
                    <Separator
                  orientation="vertical"
                  className="mr-4 ml-4 data-[orientation=vertical]:h-4"
                />
                    <NavigationMenuItem>
                            <Link href="/about/lebenslauf" passHref>
                                <span className="text-lg font-semibold ml-2 mr-2">Lebenslauf</span>
                            </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
    )
}