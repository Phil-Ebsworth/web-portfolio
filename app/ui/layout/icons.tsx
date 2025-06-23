
import { Button } from '@/components/ui/button';
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';
import { Moon, Sun } from "lucide-react"
import Link from 'next/link';

export function GithubButton() {
    const { theme } = useTheme();
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="" asChild>
                    <Link
                        href="https://github.com/Phil-Ebsworth"
                        target="_blank"
                    >
                        <img
                            src={theme === "light" ? "/github-mark.svg" : "/github-mark-white.svg"}
                            alt="GitHub"
                            style={{ height: "90%", width: "auto", maxHeight: "90%" }}
                        />
                    </Link>
                </Button>
            </TooltipTrigger>
            <TooltipContent>My GitHub</TooltipContent>
        </Tooltip>
    )
}

export function ModeToggle() {
    const { setTheme, theme } = useTheme()
    const router = useRouter();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button size="icon" onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}>
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>Change Mode</TooltipContent>
        </Tooltip>
    )
}