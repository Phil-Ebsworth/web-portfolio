import { ProjectCard } from "./project-card";
import { fetchProjectsFromJson } from "@/lib/data";
import { ProjectsGridSkeleton } from '@/app/ui/layout/skeletons';
import { Suspense } from "react";

export async function ProjectsGrid() {
    const projects = await fetchProjectsFromJson();

    return (
        <Suspense fallback={<ProjectsGridSkeleton />}>
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 w-full max-w-7xl mx-auto px-4">

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
