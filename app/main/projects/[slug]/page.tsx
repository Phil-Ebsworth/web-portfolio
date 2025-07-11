'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown'; // Importiere react-markdown

const JobDetails = () => {
    const [markdownContent, setMarkdownContent] = useState<string | null>(null);
    const params = useParams<{ slug: string }>();
    const slug = params?.slug;

    // Lädt die Markdown-Datei basierend auf dem Slug
    useEffect(() => {
        if (slug) {
            fetchMarkdownContent(slug as string);
        }
    }, [slug]);

    const fetchMarkdownContent = async (slug: string) => {
    try {
        // Lade die Markdown-Datei aus dem public/events-Verzeichnis
        const response = await fetch(`/projects/${slug}`);
        const text = await response.text();
        setMarkdownContent(text);
    } catch (error) {
        console.error("Fehler beim Laden der Markdown-Datei:", error);
    }
};

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-4">Details</h1>
            {markdownContent ? (
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
            ) : (
                <p>Loading Markdown...</p>
            )}
        </div>
    );
};

export default JobDetails;