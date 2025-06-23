import { Card } from "@/components/ui/card";

export default function Profile() {
    return (
        <div className="w-full flex flex-col items-center">
            <Card className="p-6 shadow-xl border-none max-w-4xl mx-auto">
                {/* Header mit Name und Bild */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold">Philip-Daniel Ebsworth</h2>
                        <p className="text-muted-foreground text-sm">Full Stack Tüftler mit Hang zur Typ-Sicherheit</p>
                    </div>
                    <img
                        src="/profile(neu).png"
                        alt="Profilbild"
                        className="w-28 h-28 rounded-full object-cover shadow-md self-center sm:self-start"
                    />
                </div>

                {/* Steckbrief-Bereich */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-10 text-sm mt-8 leading-relaxed">
                    <div>
                        <h3 className="font-semibold mb-1">📍 Zuhause</h3>
                        <p>Tübingen – zwischen Uni, Altstadt und guter Laune</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">📧 Erreichbar unter</h3>
                        <p><a href="mailto:Philebsworth94@gmail.com" className="underline text-blue-600">Philebsworth94@gmail.com</a></p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">🧠 Skills & Spielwiese</h3>
                        <p>TypeScript, Rust, React, Next.js – wenn’s compilet, wird’s deployed</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">🧪 Projekte</h3>
                        <ul className="list-disc list-inside">
                            <li>Polarity-Doku-Automatisierer (Rust)</li>
                            <li>Mein Portfolio (Next.js + Tailwind)</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">🎓 Lebenslange Lernerei</h3>
                        <ul className="list-disc list-inside">
                            <li>Medieninformatik (B.Sc.)</li>
                            <li>Philosophie (B.A.) – Fragen stellen kann ich auch</li>
                            <li>Sommelier-Ausbildung – 🍷 Expertise nicht nur im Code</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">🗣️ Sprachen</h3>
                        <p>Deutsch, Englisch und ein bisschen TypeScript mit Akzent</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">🚀 Dev-Philosophie</h3>
                        <p>
                            "Ich mag meine Software wie meinen Wein: gut strukturiert, mit Charakter
                            und ohne Memory Leaks."
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">🤹‍♂️ Was mich sonst begeistert</h3>
                        <p>Web & Game Dev, KI, Gitarre, Kochen, Philosophie, Whisky – je nach Tageszeit</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">🌐 Links</h3>
                        <ul className="list-disc list-inside">
                            <li><a href="https://philip-danielebsworth.com" target="_blank" className="underline text-blue-600">Website</a></li>
                            <li><a href="https://github.com/Phil-Ebsworth" target="_blank" className="underline text-blue-600">GitHub</a></li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    )
}