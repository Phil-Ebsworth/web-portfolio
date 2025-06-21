import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const timeline = [
    {
        year: "2020-2025",
        Begin: "2020",
        end: "2025",
        title: "Studium der Medieninformatik",
        position: "Bachelor Student",
        description: "Ich habe Medieninformatik an der Universität Tübingen studiert, mit einem Fokus auf Programmierung und Softwareentwicklung.",
    },
    {
        year: "2024/2025",
        Begin: "2024",
        end: "2025",
        title: "Bachelorarbeit: Automatisierte Dokumentation für Polarity",
        position: "Bachelor Thesis",
        description: "Ich arbeite an meiner Bachelorarbeit, bei der ich eine automatisierte HTML-Dokumentation für die Programmiersprache Polarity entwickle, die auf den Konzepten funktionaler und objektorientierter Programmierung basiert.",
    },
    {
        year: "2020-2025",
        Begin: "2020",
        end: "2025",
        title: "Barchef im Last Resort Tübingen",
        position: "Schichtleitung",
        description: "Während meines Studiums arbeitete ich als Barchef im Last Resort Tübingen, wo ich für die Leitung des Bar-Teams und die Organisation des Service verantwortlich war.",
    },
    {
        year: "2018-2022",
        Begin: "2018",
        end: "2022",
        title: "Sommelier im Weinhaus Beck",
        position: "Sommelier & Schichtleitung",
        description: "Ich war Sommelier und Schichtleiter im Weinhaus Beck, wo ich die Weinauswahl und den Kundenservice betreute.",
    },
];

export function TimeLine() {
  return (
     <div className="grid grid-col-2 mb-6">
                {timeline.map((event, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                        <div
                            key={index}
                            className={`relative flex ${isLeft ? "justify-start" : "justify-end"} items-center`}
                        >
                            {/* Middle vertical line */}
                            <div
                                className={`w-1/2 flex ${isLeft ? "justify-end pr-8" : "justify-start pl-8"} z-10`}
                                style={{ minHeight: "100vh" }}
                            >
                                <span className={`absolute h-full w-1 bg-gray-300 ${isLeft ? "bg-green-300 left-1/2 -translate-x-1/2" : "bg-blue-300 left-1/2 translate-x-1/2"}`} aria-hidden="true" />
                                <div className="flex flex-col items-center">
                                    <span className={`${isLeft ? "justify-start" : "justify-end"}`}>{event.year}</span>
                                    <Card className="w-full max-w-sm">
                                        <CardHeader>
                                            <CardTitle>{event.title}</CardTitle>
                                            {event.position && (
                                                <CardDescription>
                                                    {event.position}
                                                </CardDescription>
                                            )}
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-col gap-6">
                                                <p>{event.description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
  );
}