import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProjectsGrid } from "@/app/ui/projects/projects-grid";


export default function Page() {
  return (
    <div suppressHydrationWarning>
        <Card className="border-none">
        <CardHeader>
          <CardTitle>Philip-Daniel Ebsworth</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="flex text-center">
            Kreativer Full Stack Entwickler mit Fokus auf moderne Webtechnologien, Performance und Design. 
            Begeistert von TypeScript, React und Next.js, bringe ich innovative Ideen von der Konzeption bis zum Deployment. 
            Mit einem Auge fürs Detail und einer Leidenschaft für sauberen Code entwickle ich skalierbare, benutzerfreundliche Lösungen.
          </p>
          <div className="flex items-center space-x-4 w-1/5" />
          <img
            src="/profile(neu).png"
            alt="Profile"
            className="w-1/3 rounded-full object-cover"
          />
        </CardContent>
      </Card>
      <Separator className="my-4" />
      <h1 className="text-2xl font-bold mb-4 text-center">Meine Projekte</h1>
      <ProjectsGrid />
    </div>
  );
}
