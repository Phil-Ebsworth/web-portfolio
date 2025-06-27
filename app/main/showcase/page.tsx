'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ImageGrid     from './ui/image-grid';
import ImageModal    from './ui/image-modal';
import { Input }      from '@/components/ui/input';
import type { Image } from '@/lib/definitions';

const PAGE_SIZE = 20;          // Bilder pro Server-Request

export default function ShowcasePage() {
  // ---------- State ----------
  const [images,   setImages]   = useState<Image[]>([]);
  const [page,     setPage]     = useState(0);          // 0-basiert
  const [hasMore,  setHasMore]  = useState(true);
  const [loading,  setLoading]  = useState(false);

  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState<'all' | string>('all');
  const [selected, setSelected] = useState<Image | null>(null);

  // Sentinel am Ende der Liste
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ---------- Bilder nachladen ----------
  const fetchPage = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/main/showcase/api/img?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`
      );
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data: Image[] = await res.json();

      setImages(prev => [...prev, ...data]);
      setPage(prev => prev + 1);
      if (data.length < PAGE_SIZE) setHasMore(false);   // nichts mehr da
    } catch (err) {
      console.error('Failed to load images:', err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Erstes Laden bei Mount
  useEffect(() => {
    fetchPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // IntersectionObserver: lädt, wenn Sentinel sichtbar
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) fetchPage();
      },
      { rootMargin: '200px' } // frühere Vor­aus­lösung
    );

    const current = bottomRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.disconnect();
    };
  }, [fetchPage]);

  // ---------- Suche & Kategorie-Filter ----------
  const filteredImages = images.filter(
    img =>
      (img.title.toLowerCase().includes(search.toLowerCase()) ||
        img.category.some(cat =>
          cat.toLowerCase().includes(search.toLowerCase())
        )) &&
      (category === 'all' || img.category.includes(category))
  );

  // ---------- Render ----------
  return (
    <div className="flex flex-col items-center w-full">
      {/* Suchfeld + (optionaler) Kategorie-Auswahl */}
      <div className="w-[80%] max-w-2xl mt-6 mb-4 flex gap-4 sticky top-20 z-10 bg-opacity-90 backdrop-blur rounded-lg">
        <Input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Suche nach Titel..."
          className="w-full px-4 py-2 border rounded shadow"
        />

        {/* Beispielhafter einfacher Category-Selector */}
        {/* <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border rounded px-3"
        >
          <option value="all">Alle Kategorien</option>
          <option value="nature">Nature</option>
          <option value="architecture">Architecture</option>
        </select> */}
      </div>

      {/* Bild-Grid */}
      <ImageGrid images={filteredImages} onImageClick={setSelected} />

      {/* Ladeanzeige */}
      {loading && <p className="my-4 text-sm text-gray-500">Lade …</p>}

      {/* Unsichtbarer „Sentinel” */}
      <div ref={bottomRef} className="h-1 w-full" />

      {/* Modal */}
      <ImageModal
        image={selected}
        onClose={() => setSelected(null)}
      />

      {/* Ende-Hinweis */}
      {!hasMore && (
        <p className="my-6 text-sm text-gray-400">
          Keine weiteren Bilder vorhanden
        </p>
      )}
    </div>
  );
}
