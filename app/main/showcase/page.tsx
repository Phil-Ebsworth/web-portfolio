'use client';

import { useEffect, useState } from 'react';
import ImageGrid from './ui/image-grid';
import ImageModal from './ui/image-modal';
import { Input } from '@/components/ui/input';
import { Image } from '@/lib/definitions';

export default function ShowcasePage() {
  const [imageFiles, setImageFiles] = useState<Image[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const filteredImages = imageFiles.filter((img) =>
    (img.title.toLowerCase().includes(search.toLowerCase()) ||
      img.category.some((cat) =>
        cat.toLowerCase().includes(search.toLowerCase())
      )) &&
    (category === 'all' || img.category.includes(category))
  );

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/main/showcase/api/img');
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setImageFiles(data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error('Failed to load images:', err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-[80%] max-w-2xl mt-6 mb-4 flex gap-4 sticky top-20 z-10 bg-opacity-90 backdrop-blur rounded-lg">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Suche nach Titel..."
          className="w-full px-4 py-2 border rounded shadow"
        />
      </div>

      <ImageGrid images={filteredImages} onImageClick={setSelectedImage} />
      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
