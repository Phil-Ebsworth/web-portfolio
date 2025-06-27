'use client';

import { useEffect, useRef, useState } from 'react';
import ImageCard from './image-card';
import { Image } from '@/lib/definitions';

// Tune these to suit your UX needs
const INITIAL_BATCH = 15; // how many images to render on first paint
const BATCH_SIZE = 12; // how many additional images to load each time the sentinel becomes visible

export default function ImageGrid({
  images,
  onImageClick,
}: {
  images: Image[];
  onImageClick: (img: Image) => void;
}) {
  /**
   * `visibleCount` stores how many images we should currently render.
   * Starts with `INITIAL_BATCH` and grows by `BATCH_SIZE` whenever the
   * sentinel at the bottom of the grid intersects the viewport.
   */
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);

  /**
   * `loadMoreRef` is attached to an (almost) invisible div placed after the grid.
   * When this div scrolls into view, we know we've reached the bottom and can
   * safely load more images.
   */
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, images.length));
        }
      },
      {
        rootMargin: '200px', // start pre‑loading just *before* the user hits the bottom
      }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [images.length]);

  // Restrict the working set to the portion we actually want to show.
  const visibleImages = images.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto mt-6">
        {[0, 1, 2].map((col) => (
          <div key={col} className="flex flex-col gap-4">
            {visibleImages
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

      {/* Sentinel: only rendered while there are still images to load */}
      {visibleCount < images.length && <div ref={loadMoreRef} className="h-1" />}
    </>
  );
}
