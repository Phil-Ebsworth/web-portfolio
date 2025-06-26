'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Cocktail } from '@/lib/definitions';
import { useEffect, useState } from 'react';

export default function CocktailDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const res = await fetch(`/main/cocktail-cosmos/api/cocktails/${slug}`);
        if (!res.ok) throw new Error('Not found');
        const data: Cocktail = await res.json();
        setCocktail(data);
      } catch (error) {
        console.error('Fehler beim Laden des Cocktails:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCocktail();
  }, [slug]);

  if (loading) return <p className="p-6">Lade Daten…</p>;
  if (!cocktail) return <p className="p-6 text-red-500">Cocktail nicht gefunden.</p>;

  return (
    <main className="w-full mx-auto p-6">
    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
      {/* Bild links */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Image
        src={cocktail.image_url}
        alt={cocktail.name}
        width={600}
        height={600}
        className="rounded-xl object-cover w-[85%] h-auto shadow-lg"
        />
      </div>

      {/* Inhalt rechts */}
      <div className="w-full lg:w-1/2 space-y-6 lg:mt-6">
        <div>
        <h1 className="text-4xl font-bold mb-2">{cocktail.name}</h1>
        <p className="secondary- text-lg">{cocktail.description}</p>
        </div>

        <div>
        <h2 className="text-2xl font-semibold mb-2">Zutaten</h2>
        <ul className="list-disc list-inside space-y-1">
          {cocktail.ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        </div>

        <div>
        <h2 className="text-2xl font-semibold mb-2">Zubereitung</h2>
        <p className="leading-relaxed">{cocktail.instructions}</p>
        </div>
      </div>
    </div>
    </main>
  );
}
