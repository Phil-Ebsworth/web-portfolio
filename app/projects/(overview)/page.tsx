import { ThemeProvider } from "@/components/theme-provider";
import { ProjectsGrid } from "@/components/projects-grid";

export default function Page() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
        <main className="flex flex-col items-center justify-center min-h-screen min-w-screen p-8 ">
      <ProjectsGrid />
      </main>
        </ThemeProvider>
    );
}