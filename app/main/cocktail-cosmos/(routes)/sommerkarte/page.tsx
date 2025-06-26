'use client';

import { useEffect, useState } from 'react';
import { Cocktail } from '@/lib/definitions';
import CocktailCard from '@/app/main/cocktail-cosmos/ui/cocktail-card';

export default function SommerkartePage() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    const fetchSommerDrinks = async () => {
      try {
        const res = await fetch('/main/cocktail-cosmos/api/cocktails/summerdrinks');
        if (!res.ok) throw new Error('Fehler beim Laden');
        const data = await res.json();
        setCocktails(data);
      } catch (err) {
        console.error('Fehler:', err);
      }
    };

    fetchSommerDrinks();
  }, []);

  return (
    <main className="w-full flex flex-col items-center gap-6 px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-4">🍹 Summer Top-10</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full max-w-5xl">
        {cocktails.map((cocktail) => (
          <CocktailCard key={cocktail.slug} cocktail={cocktail} />
        ))}
      </div>
    </main>
  );
}
