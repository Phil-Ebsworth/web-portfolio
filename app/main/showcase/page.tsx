'use client';

import path from 'path';
import ImageCard from './image-card';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const imagesDir = path.join(process.cwd(), 'public', 'images');

type Image = {
    url: string;
    title: string;
    slug: string;
    category: string[];
}

export default function ShowcasePage() {
    const [imageFiles, setImageFiles] = useState<Image[]>([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const filteredImages = imageFiles
        .filter(img =>
            (
                img.title.toLowerCase().includes(search.toLowerCase()) ||
                img.category.some(cat => cat.toLowerCase().includes(search.toLowerCase()))
            ) &&
            (category === 'all' || img.category.includes(category))
        );

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/main/showcase/api/img');
                if (!res.ok) {
                    throw new Error(`Server error: ${res.status}`);
                }
                const data = await res.json();
                if (Array.isArray(data)) {
                    setImageFiles(
                        data.map((img: { url: string; title: string; slug: string; category: string[] }) => ({
                            url: img.url,
                            title: img.title,
                            slug: img.slug,
                            category: img.category,
                        }))
                    );
                } else {
                    throw new Error('Datenformat ungültig');
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der Bilder:', error);
            }
        };
        fetchImages();
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-2xl mt-6 mb-4 flex gap-4 sticky top-20 z-10 bg-opacity-90 backdrop-blur rounded-lg">
                <Input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Suche nach Titel..."
                    className="w-full  px-4 py-2 border rounded shadow focus:outline-none"
                />
            </div>
            <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto mt-6">
                {[0, 1, 2].map(col => (
                    <div key={col} className="flex flex-col gap-4">
                        {filteredImages
                            .filter((_, idx) => idx % 3 === col)
                            .map(img => (
                                <ImageCard key={img.title} src={img.url} alt={img.title} slug={img.slug} />
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}