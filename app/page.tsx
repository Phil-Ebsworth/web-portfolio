import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function Page() {
  return (
        <Card className="border-none">
        <CardHeader>
          <CardTitle>Philip-Daniel Ebsworth</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="flex-1 text-center">
            Kreativer Full Stack Entwickler mit Fokus auf moderne Webtechnologien, Performance und Design. 
            Begeistert von TypeScript, React und Next.js, bringe ich innovative Ideen von der Konzeption bis zum Deployment. 
            Mit einem Auge fürs Detail und einer Leidenschaft für sauberen Code entwickle ich skalierbare, benutzerfreundliche Lösungen.
          </p>
          <div className="flex items-center space-x-4 w-1/5" />
          <img
            src="/profile.png"
            alt="Profile"
            className="w-1/3 rounded-full object-cover"
          />
        </CardContent>
      </Card>
  );
}