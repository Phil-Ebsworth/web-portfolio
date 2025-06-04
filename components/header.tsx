import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { NavigationMenuDemo } from "@/components/navigation-menu"

export function SiteHeader() {
    return (
        <header className="">
            <div className="">
                <div>
                    <Button variant="ghost" asChild size="icon" className="hidden sm:flex p-0 scale-125">
                        <a
                            href="https://github.com/Phil-Ebsworth"
                            rel="noopener noreferrer"
                            target="_blank"
                            aria-label="GitHub"
                            className="dark:text-foreground flex items-center justify-center w-12 h-12"
                        >
                            <img
                                src="/github-mark-white.svg"
                                alt="GitHub"
                                className="w-5 h-5"
                                style={{ display: "block" }}
                            />
                        </a>
                    </Button>
                </div>
            </div>
        </header>
    )
}
