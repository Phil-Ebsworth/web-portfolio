import JobCard from "./job-card";
import React from "react";
import { TimelineEvent } from "@/app/lib/definitions";

export default function Events({ timeline_jobs, openIdxArrJob, handleToggleIdxJob, position }: { timeline_jobs: TimelineEvent[], openIdxArrJob: boolean[], handleToggleIdxJob: (idx: number) => void, position: string }) {
    return (
        <div className="w-full flex flex-row ">
            {position === "right" && (<div className="w-3 flex flex-col items-center h-full rounded-lg">
                    {timeline_jobs.map((item, idx) => (
                        <div
                            key={idx}
                            className="w-3 bg-green-200 mb-1 rounded-lg"
                            style={{ height: `${item.duration * 10}%` }}
                        ></div>
                    ))}
                </div>)}
            <div className="w-full flex flex-col h-full ml-2 mr-5">
                {timeline_jobs.map((item, idx) => (
                    <div
                        key={idx}
                        className="w-full mb-2"
                        style={{ height: `${item.duration * 10}%` }}
                    >
                        <div className={`flex ${position === "left" ? "justify-end" : "justify-start"} items-center h-full`}>
                            <JobCard event={item} idx={idx} openIdxArrJob={openIdxArrJob} handleToggleIdx={handleToggleIdxJob} />
                        </div>
                    </div>
                ))}
            </div>
            {position === "left" && (
                <div className="w-3 flex flex-col h-full rounded-lg">
                    {timeline_jobs.map((item, idx) => (
                        <div
                            key={idx}
                            className="w-3 bg-blue-200 mb-1 rounded-lg"
                            style={{ height: `${item.duration * 10}%` }}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
}