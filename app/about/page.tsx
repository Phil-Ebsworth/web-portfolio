'use client';

import React from "react";
import { TimeLine } from "./ui/timeline";

export default function Page() {
    return (
        <div className="p-4 w-full">
            <h1 className="text-3xl font-bold mb-4 text-center">Mein Lebenslauf</h1>
            <div className="w-full flex flex-row items-center mb-4">
                <h2 className="flex-1 text-center text-xl">Berufliche Laufbahn</h2>
                <h2 className="flex-1 text-center text-xl">Akademische Ausbildung</h2>
            </div>
            <TimeLine />
        </div>
    );
}


