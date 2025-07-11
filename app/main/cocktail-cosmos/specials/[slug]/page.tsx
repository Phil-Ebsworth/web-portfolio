'use client';

import { useEffect, useState } from 'react';
import { CocktailCard } from '@/app/main/cocktail-cosmos/ui/cocktail-card';
import { useParams } from 'next/navigation';
import { Special, Cocktail } from '@/lib/definitions';


export default function SommerkartePage() {
  const { slug } = useParams<{ slug: string }>();
    const [special, setSpecial] = useState<Special | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  
    useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const res = await fetch(`/main/cocktail-cosmos/api/specials/${slug}`);
        if (!res.ok) throw new Error('Not found');
        const data: Special = await res.json();
        setSpecial(data);
        const cocktailData = await Promise.all(
            data.cocktails.map(async (cocktailSlug) => {
                const res = await fetch(`/main/cocktail-cosmos/api/cocktails/${cocktailSlug}`);
                return await res.json();
            })
        );
        setCocktails(cocktailData);
      } catch (error) {
        console.error('Fehler beim Laden des Cocktails:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCocktail();
  }, [slug]);

  if (loading) return <p className="p-6">Lade Daten…</p>;
  if (!special) return <p className="p-6">Spezial nicht gefunden</p>;



  return (
    <main className="w-full flex flex-col items-center gap-6 px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-4">{special.title}</h1>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 w-full max-w-5xl">
        {cocktails.map((cocktail) => (
          <CocktailCard key={cocktail.slug} cocktail={cocktail} />
        ))}
      </div>
    </main>
  );
}
