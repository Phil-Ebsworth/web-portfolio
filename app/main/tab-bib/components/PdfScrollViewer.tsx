'use client';

import { Slider } from '@/components/ui/slider';
import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ArrowDownToLine, ArrowUpToLine, Menu, Pause, Play, RotateCw } from 'lucide-react';

import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
} from '@/components/ui/menubar';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';


export default function PdfScrollViewer({ file }: { file: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrolling, setScrolling] = useState(false);
    const [numPages, setNumPages] = useState<number>(0);
    const [scrollSpeed, setScrollSpeed] = useState(50);
    const [startPoint, setStartPoint] = useState(0);
    const [endPoint, setEndPoint] = useState(100);

    useEffect(() => {
        if (!scrolling) return;
        const interval = setInterval(() => {
            if (containerRef.current) {
                if (
                    containerRef.current.scrollTop + containerRef.current.clientHeight >=
                    endPoint * containerRef.current.scrollHeight / 100
                ) {
                    setScrolling(false);
                } else {
                    containerRef.current.scrollTop += 1;
                }
            }
        }, 100 - scrollSpeed);

        return () => clearInterval(interval);
    }, [scrolling, scrollSpeed]);

    const handleStartPointChange = (value: number) => {
        setStartPoint(value);
        handleScrollToStart();
    };

    const handleScrollToStart = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: startPoint * containerRef.current.scrollHeight / 100, behavior: 'smooth' });
        }
        if (scrolling) {
            setScrolling(false);
            const container = containerRef.current;
            if (container) {
                const targetScrollTop = startPoint * container.scrollHeight / 100;
                if (Math.abs(container.scrollTop - targetScrollTop) > 2) {
                    const handle = setInterval(() => {
                        if (Math.abs(container.scrollTop - targetScrollTop) <= 2) {
                            setScrolling(true);
                            clearInterval(handle);
                        }
                    }, 20);
                    return;
                }
            }
            setScrolling(true);
        }
    };

    const handleEndPointChange = (value: number) => {
        setEndPoint(value);
    };

    const handleScrollToEnd = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: containerRef.current.scrollHeight * endPoint / 100, behavior: 'smooth' });
        }
        if (scrolling) {
            setScrolling(false);
            const container = containerRef.current;
            if (container) {
                const targetScrollTop = container.scrollHeight * endPoint / 100;
                if (Math.abs(container.scrollTop - targetScrollTop) > 2) {
                    const handle = setInterval(() => {
                        if (Math.abs(container.scrollTop - targetScrollTop) <= 2) {
                            setScrolling(true);
                            clearInterval(handle);
                        }
                    }, 20);
                    return;
                }
            }
            setScrolling(true);
        }
    };

    const handleStartToggle = () => {
        setScrolling((prev) => !prev);
    };

    const handleRestart = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: startPoint * containerRef.current.scrollHeight / 100, behavior: 'smooth' });
        }
        setScrolling(false);
        const container = containerRef.current;
        if (container) {
            const targetScrollTop = startPoint * container.scrollHeight / 100;
            if (Math.abs(container.scrollTop - targetScrollTop) > 2) {
                const handle = setInterval(() => {
                    if (Math.abs(container.scrollTop - targetScrollTop) <= 2) {
                        setScrolling(true);
                        clearInterval(handle);
                    }
                }, 20);
                return;
            }
        }
        setScrolling(true);
    };

    return (
        <div>
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex justify-center items-center mb-4 bg-white/90 rounded shadow-lg px-4 py-2">
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger className="" onClick={handleScrollToStart}>
                            <ArrowUpToLine />
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger onClick={handleRestart}>
                            <RotateCw className="mr-2" />
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger onClick={handleStartToggle}>
                            {scrolling ? <Pause /> : <Play />}
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <p className="text-lg">Menu</p>
                            <MenubarContent >
                                <MenubarItem>
                                    Startpoint: {startPoint}
                                </MenubarItem>
                                <MenubarItem>
                                    <Slider
                                        defaultValue={[startPoint]}
                                        max={100}
                                        step={1}
                                        onValueChange={([value]) => handleStartPointChange(value)}
                                    />
                                </MenubarItem>
                                <MenubarItem>
                                    <MenubarSeparator />
                                </MenubarItem>
                                <MenubarItem>
                                    Endpoint: {endPoint}
                                </MenubarItem>
                                <MenubarItem>
                                    <Slider
                                        defaultValue={[endPoint]}
                                        max={100}
                                        step={1}
                                        onValueChange={([value]) => handleEndPointChange(value)}
                                    />
                                </MenubarItem>
                                <MenubarItem>
                                    <MenubarSeparator />
                                </MenubarItem>
                                <MenubarItem>
                                    Scroll Speed: {scrollSpeed}
                                </MenubarItem>
                                <MenubarItem>
                                    <Slider
                                        defaultValue={[scrollSpeed]}
                                        max={100}
                                        step={1}
                                        onValueChange={([value]) => setScrollSpeed(value)}
                                    />
                                </MenubarItem>
                                <MenubarItem>
                                    <MenubarSeparator />
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className="" onClick={handleScrollToEnd}>
                            <ArrowDownToLine />
                        </MenubarTrigger>
                    </MenubarMenu>
                </Menubar>
            </div>
            <div
                ref={containerRef}
                className="h-[90vh] overflow-y-auto border rounded p-2 flex justify-center"
            >
                <Document file={file} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                    <div className="flex flex-col items-center w-full">
                        {Array.from({ length: numPages }, (_, i) => (
                            <Page
                                key={`page_${i + 1}`}
                                pageNumber={i + 1}
                                width={containerRef.current?.clientWidth ? containerRef.current.clientWidth - 32 : undefined}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        ))}
                    </div>
                </Document>
            </div>
        </div>
    );
}
