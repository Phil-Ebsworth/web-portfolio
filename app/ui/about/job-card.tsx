import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TimelineEvent } from '@/lib/definitions';
import { AtSign, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function JobCard({ event, idx, openIdxArrJob, handleToggleIdx }: { event: TimelineEvent, idx: number, openIdxArrJob: boolean[], handleToggleIdx: (idx: number) => void }) {
    return (
        <Card className=" mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader onClick={() => handleToggleIdx(idx)} className="cursor-pointer">
                <h2 className="text-lg font-semibold text-center">{event.title}</h2>
                <div className="flex flex-row  items-center mt-1 gap-4 text-xs">
                    <Link
                        href={event.link}
                        target="_blank"
                        className="flex items-center gap-1"
                    >
                        <AtSign className="w-3 h-3" />
                        <span>{event.company}</span>
                    </Link>
                    <Link
                        href={event.link}
                        target="_blank"
                        className="flex items-center gap-1"
                    >
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                    </Link>
                    {openIdxArrJob[idx] && (
                    <div className="flex flex-row items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{event.begin} - {event.end}</span>
                    </div>
                    )}
                </div>
            </CardHeader>
            {
                openIdxArrJob[idx] && (
                    <CardContent>
                        <p className="text-left mt-2 mb-4">
                            {event.description}
                        </p>
                        {event.type === "job" && (
                            <>
                                <h2 className="underline">Aufgaben:</h2>
                                {event.tasks && event.tasks.length > 0 && (
                                    <ul className="list-disc list-inside mt-2">
                                        {event.tasks.map((task: string, i: number) => (
                                            <li key={i}>{task}</li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        )}
                        <Button
                            variant="link"
                            className="p-0 h-auto mt-2"
                            onClick={() => {
                                window.location.href = `/main/about/lebenslauf/${event.link}`;
                            }}
                        >
                            Read more
                        </Button>
                    </CardContent>
                )
            }
            
            
        </Card >
    );
}