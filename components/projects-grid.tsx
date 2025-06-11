import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ProjectCard } from "./project-card";
import { fetchProjects } from "@/app/lib/data";

export async function ProjectsGrid() {
    const projects = await fetchProjects();
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-4 xl:gap-8 2xl:grid-cols-2 2xl:gap-10 max-w-7xl mx-auto">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    img={project.image_url}
                    title={project.title}
                    description={project.description}
                    content={project.content}
                    link={project.link}
                /> 
            ))}
        </div>
    )
}
export default ProjectsGrid;