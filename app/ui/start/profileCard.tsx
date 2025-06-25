import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

export default function ProfileCard() {
    return (
        <Card className="border-none shadow-xl p-6">
        <CardHeader className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight">Philip-Daniel Ebsworth</h1>
            <p className="mt-2 text-lg text-zinc-300">
              Full Stack Entwickler mit einem Hang zur Ästhetik – irgendwo zwischen <span className="italic">clean code</span> und <span className="italic">Creative Chaos</span>.
            </p>
            <p className="mt-2 max-w-md">
              Ich entwickle moderne Webanwendungen mit <strong>TypeScript</strong>, <strong>React</strong> und <strong>Next.js</strong> – immer mit einem Auge für Details, Performance und Nutzererlebnis.
            </p>
          </div>
          <img
            src="/profile(neu).png"
            alt="Profilbild"
            className="w-60 h-60 rounded-full object-cover shadow-lg hover:scale-105 transition-transform"
          />
        </CardHeader>

        <CardContent className="mt-6 text-center">
          <p className="text-md text-zinc-400">
            „Ich schreibe Code, der nicht nur läuft – sondern auch verstanden werden will.“
          </p>
        </CardContent>
      </Card>
    );
}