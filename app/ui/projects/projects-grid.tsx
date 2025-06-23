import { ProjectCard } from "./project-card";
import { fetchProjectsFromJson } from "@/lib/data";
import { ProjectsGridSkeleton } from '@/app/ui/layout/skeletons';
import { Suspense } from "react";

export async function ProjectsGrid() {
    const projects = await fetchProjectsFromJson();
    return (
        <Suspense fallback={<ProjectsGridSkeleton />}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 xl:gap-8 2xl:grid-cols-2 2xl:gap-10 max-w-7xl mx-auto mt-6">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    img={project.image_url}
                    title={project.title}
                    description={project.description}
                    content={project.content}
                    link={project.link}
                    md_link={project.md_link}
                />
            ))}
        </div>
        </Suspense>
    );
}

export default ProjectsGrid;