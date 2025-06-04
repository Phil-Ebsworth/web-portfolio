import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function ProjectsGrid() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-4 xl:gap-8 2xl:grid-cols-2 2xl:gap-10 max-w-7xl mx-auto">
            <Card className="w-full @container/card">
                <div className="overflow-hidden">
                    <img
                        src="/documentation.png"
                        alt="Project preview"
                        className="w-full h-40 rounded-t-xl"
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Automatic documentation for Polarity lang</CardTitle>
                    <CardDescription>My Bachelor Thesis</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        This thesis focuses on the automatic generation of HTML documentation for the experimental programming language Polarity. 
                        Polarity is built around the dual concepts of “data” and “codata” and combines both functional and 
                        object‐oriented programming paradigms. In particular, 
                        the work examines how Polarity source files can be parsed into an untyped syntax tree 
                        and then transformed—using Rust libraries such as pretty and Askama—into well‐structured, 
                        template‐based HTML pages. By separating content and presentation (via Askama templates and a central CSS stylesheet), 
                        the system produces a separate HTML document for each Polarity module, complete with syntax highlighting and hyperlinks.
                        </p>
                </CardContent>
                <CardFooter>
                    <a
                        href="#"
                        className="text-primary hover:underline font-medium"
                    >
                        View Details
                    </a>
                </CardFooter>
            </Card>
            <Card className="w-full @container/card">
                <div className="overflow-hidden">
                    <img
                        src="/roboarena.png"
                        alt="Project preview"
                        className="w-full h-40 rounded-t-xl"
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Roboarena</CardTitle>
                    <CardDescription>A small, top-down roguelike approach.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        RoboArena is a compact, top-down roguelike built collaboratively in Pygame. 
                        You pilot a customizable combat robot through procedurally generated arenas, 
                        battling waves of mechanized foes and navigating environmental hazards. 
                        Each run challenges you to scavenge parts, upgrade your arsenal, 
                        and adapt your playstyle—whether you favor rapid-fire energy bursts, precision sniper shots, 
                        or close-quarters melee strikes. Developed with a few friends, RoboArena blends fast-paced action, 
                        tight resource management, 
                        and pixel-art charm into bite-sized sessions that keep you coming back for “just one more run.”
                    </p>
                </CardContent>
                <CardFooter>
                    <a
                        href="#"
                        className="text-primary hover:underline font-medium"
                    >
                        View Details
                    </a>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProjectsGrid;