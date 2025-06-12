import { ThemeProvider } from "@/app/ui/theme-provider";
import { ProjectsGrid } from "@/app/ui/projects-grid";

export default function Page() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ProjectsGrid />
        </ThemeProvider>
    );
}