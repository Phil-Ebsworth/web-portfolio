'use client';

import React from "react";
import { TimeLine } from "./ui/timeline";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const timeline_job = [
    {
        duration: 5,
    },
    {
        duration: 1,
    },
];
const timeline_uni = [
    {
        duration: 1,
    },
    {
        duration: 3,
    },
];

export default function Page() {
    const [openIdxArrJob, setOpenIdxArrJob] = React.useState<boolean[]>([false, false]);
    const [openIdxArrUni, setOpenIdxArrUni] = React.useState<boolean[]>([false, false]);

    type TimelineType = "job" | "uni";

    const handleToggleIdx = (type: TimelineType, idx: number) => {
        if (type === "job") {
            setOpenIdxArrJob(prev => {
                const newArr = [...prev];
                newArr[idx] = !newArr[idx];
                return newArr;
            });
        } else {
            setOpenIdxArrUni(prev => {
                const newArr = [...prev];
                newArr[idx] = !newArr[idx];
                return newArr;
            });
        }
    };

    return (
        <div className="p-4 w-full">
            <h1 className="text-3xl font-bold mb-4 text-center">Mein vertikaler Zeitstrahl</h1>
            {/* die ganze timeline */}
            <div className="flex w-full min-h-screen">
                {/* linke seite */}
                <div className="w-full flex flex-row ">
                    {/* events */}
                    <div className="w-full flex flex-col h-full ml-2 mr-5">
                        {timeline_job.map((item, idx) => (
                            <div
                                key={idx}
                                className="w-full mb-2"
                                style={{ height: `${item.duration * 10}%` }}
                            >
                            <div className="flex justify-end items-center h-full">
                                <Card onClick={() => handleToggleIdx('job', idx)}>
                                    <CardHeader>
                                        <h2 className="text-lg font-semibold text-center">Job Event {idx + 1}</h2>
                                    </CardHeader>
                                    {openIdxArrJob[idx] && (
                                        <CardContent>
                                            <p className="text-center mt-2">
                                                Details zum Job Event {idx + 1}
                                            </p>
                                        </CardContent>
                                    )}
                                </Card>
                            </div>
                            </div>
                        ))}
                    </div>
                    {/* events auf timeline */}
                    <div className="w-3 flex flex-col h-full rounded-lg">
                        {timeline_job.map((item, idx) => (
                            <div
                                key={idx}
                                className="w-3 bg-blue-200 mb-1 rounded-lg"
                                style={{ height: `${item.duration * 10}%` }}
                            ></div>
                        ))}
                    </div>
                </div>
                <div className="w-10">
                {/* Vertikale Zeitstrahlspalte für die letzten zehn Jahre */}
                <div className="flex flex-col h-full justify-between items-center ml-2 mr-2">
                    {Array.from({ length: 10 }).map((_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                            <div key={year} className="flex flex-col items-center">
                                <span className="text-mb ">{year}</span>
                                {i < 9 && <div className="h-20 bg-gray-400 my-1" />}
                            </div>
                        );
                    })}
                </div>
                </div>
                {/* rechte seite */}
                <div className="w-full flex flex-row  ">
                    {/* events auf timeline */}
                    <div className="w-3 flex flex-col items-center h-full rounded-lg">
                        {timeline_uni.map((item, idx) => (
                            <div
                                key={idx}
                                className="w-3 bg-green-200 mb-2 rounded-lg"
                                style={{ height: `${item.duration * 10}%` }}
                            ></div>
                        ))}
                    </div>
                    {/* events */}
                    <div className="w-full flex flex-col items-center h-full ml-2 mr-2">
                        {timeline_uni.map((item, idx) => (
                            <div
                                key={idx}
                                className="w-full mb-2"
                                style={{ height: `${item.duration * 10}%` }}
                            >
                                <div className="flex justify-start items-center h-full">
                                    <Card onClick={() => handleToggleIdx('uni', idx)}>
                                        <CardHeader>
                                            <h2 className="text-lg font-semibold text-center">Uni Event {idx + 1}</h2>
                                        </CardHeader>
                                            {openIdxArrUni[idx] && (
                                                <CardContent>
                                                <p className="text-center mt-2">
                                                    Details zum Uni Event {idx + 1}
                                                </p>
                                                </CardContent>
                                            )}
                                        
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


