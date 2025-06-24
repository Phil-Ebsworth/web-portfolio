// /main/tab-bib/[slug]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PdfScrollViewer from '../components/PdfScrollViewer';

type Tab = {
  id: number;
  title: string;
  artist: string;
  difficulty?: string;
  tuning?: string;
  chords?: string[];
  tab_data: string;
  pdf_url?: string;
    slug: string;
};

export default function TabDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [tab, setTab] = useState<Tab | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTab = async () => {
      try {
        const res = await fetch(`/main/tab-bib/api/tabs/${slug}`);
        if (!res.ok) throw new Error('Not found');
        const data: Tab = await res.json();
        setTab(data);
      } catch (error) {
        console.error('Fehler beim Laden des Tabs:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchTab();
  }, [slug]);

  if (loading) return <p className="p-6">Lade Daten…</p>;
  if (!tab) return <p className="p-6 text-red-500">Tab nicht gefunden.</p>;

  return (
    <div className="w-full h-screen overflow-hidden m-0 p-0">
      <PdfScrollViewer file={tab.pdf_url || ''} />
    </div>
  );
}
