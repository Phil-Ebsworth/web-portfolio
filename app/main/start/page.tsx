import { Separator } from "@/components/ui/separator"
import { ProjectsGrid } from "@/app/ui/projects/projects-grid";
import ProfileCard from "@/app/ui/start/profileCard";


export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <ProfileCard />
      <Separator className="my-6" />
      <h2 className="text-2xl font-bold mb-4 text-center">Meine Projekte</h2>
      <ProjectsGrid />
    </div>
  );
}
