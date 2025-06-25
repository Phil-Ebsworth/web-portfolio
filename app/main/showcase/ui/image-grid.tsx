'use client';

import ImageCard from './image-card';

import { Image } from '@/lib/definitions';

export default function ImageGrid({
  images,
  onImageClick,
}: {
  images: Image[];
  onImageClick: (img: Image) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto mt-6">
      {[0, 1, 2].map((col) => (
        <div key={col} className="flex flex-col gap-4">
          {images
            .filter((_, idx) => idx % 3 === col)
            .map((img) => (
              <ImageCard
                key={img.title}
                src={img.url}
                alt={img.title}
                slug={img.slug}
                onClick={() => onImageClick(img)}
              />
            ))}
        </div>
      ))}
    </div>
  );
}
