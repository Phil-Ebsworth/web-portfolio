import React from "react";
import events from "@/app/data/events.json";
import Events from "./events";
import YearLabels from "./year-labels";
import { TimelineEvent } from "@/lib/definitions";

const timeline_job: TimelineEvent[] = events.timeline_job;
const timeline_uni: TimelineEvent[] = events.timeline_uni;

export function TimeLine() {
    const [openIdxArrJob, setOpenIdxArrJob] = React.useState<boolean[]>([false, false]);
    const [openIdxArrUni, setOpenIdxArrUni] = React.useState<boolean[]>([false, false]);

    const handleToggleIdxJob = (idx: number) => {
        setOpenIdxArrJob(prev => {
            const newArr = [...prev];
            newArr[idx] = !newArr[idx];
            return newArr;
        });
    };

    const handleToggleIdxUni = (idx: number) => {
        setOpenIdxArrUni(prev => {
            const newArr = [...prev];
            newArr[idx] = !newArr[idx];
            return newArr;
        });
    };

    return (
        <div className="flex w-full min-h-screen">
            <Events timeline_jobs={timeline_job} openIdxArrJob={openIdxArrJob} handleToggleIdxJob={handleToggleIdxJob} position="left" />
            <YearLabels />
            <Events timeline_jobs={timeline_uni} openIdxArrJob={openIdxArrUni} handleToggleIdxJob={handleToggleIdxUni} position="right" />
        </div>
    );
}