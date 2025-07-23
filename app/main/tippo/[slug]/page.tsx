'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TypingPage } from '../components/TypingPage';

export default function SlugPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  const [data, setData] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`/main/tippo/api/texts/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Nicht gefunden');
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        console.error('Fehler beim Laden:', err);
      });
  }, [slug]);

  if (!data) return <p className="p-6">Lade Text …</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      <TypingPage sampleText={data.content} />
    </div>
  );
}
