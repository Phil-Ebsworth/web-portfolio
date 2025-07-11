'use client';

import { useEffect, useState } from 'react';
import { SpecialCard } from './ui/cocktail-card';
import { Special } from '@/lib/definitions';

export default function HomePage() {
  const [specials, setSpecials] = useState<Special[]>([]);

  useEffect(() => {
    const fetchSpecials = async () => {
      try {
        const res = await fetch('/main/cocktail-cosmos/api/specials');
        if (!res.ok) throw new Error('Failed to fetch specials');
        const data: Special[] = await res.json();
        setSpecials(data);
      } catch (error) {
        console.error('Error fetching specials:', error);
      }
    };

    fetchSpecials();
  }, []);

  return (
    <div className="flex flex-col gap-8 p-6 max-w-5xl mx-auto">
      {/* Specials */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Sammlungen</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {specials.map((special) => (
            <SpecialCard
              title={special.title}
              image={special.image_url} // Assuming images are named after the slug
              description={special.description}
              link={`/main/cocktail-cosmos/specials/${special.slug}`}
            />
          ))}
        </div>

      </section>

      {/* Klassiker */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Beliebte Drinks</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <SpecialCard
            title="Espresso Martini"
            image="/cocktails/espresso-martini.png"
            description="Salzig-sauer, eiskalt – der mexikanische Kult-Drink."
            link="/main/cocktail-cosmos/espresso-martini"
          />
          <SpecialCard
            title="Long Island Iced Tea"
            image="/cocktails/long-island-iced-tea.png"
            description="Ein starker Mix mit Cola-Finish – nicht für Anfänger!"
            link="/main/cocktail-cosmos/long-island-iced-tea"
          />
        </div>
      </section>

      {/* Cocktail der Woche */}
      <section >
        <div className="grid gap-6 items-center justify-items-center w-full">
        <h2 className="text-3xl font-bold mb-4">Cocktail der Woche</h2>
        <SpecialCard
          title="Gin Basil Smash"
          image="/cocktails/gin-basil-smash.png"
          description="Frischer Basilikum trifft auf zitronige Frische – grün, modern, herb."
          link="/main/cocktail-cosmos/gin-basil-smash"
        />
        </div>
      </section>
    </div>
  );
}
