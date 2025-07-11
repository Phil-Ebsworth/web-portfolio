'use client';

import { useState, useEffect } from 'react';
import { CocktailCard } from '../ui/cocktail-card';
import { Cocktail as CocktailType } from '@/lib/definitions';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const ALCOHOL_TYPES = ['Rum', 'Gin', 'Wodka', 'Whiskey', 'Tequila', 'Prosecco'];
const COMMON_INGREDIENTS = ['Soda', 'Zitronensaft', 'Kaffeelikör', 'Limoncello'];

export default function CocktailPage() {
  const [cocktails, setCocktails] = useState<CocktailType[]>([]);
  const [search, setSearch] = useState('');
  const [selectedAlcohol, setSelectedAlcohol] = useState('none');
  const [selectedCommon, setSelectedCommon] = useState('none');

  useEffect(() => {
    async function fetchCocktails() {
      try {
        const response = await fetch('/main/cocktail-cosmos/api/cocktails');
        const data = await response.json();
        if (!Array.isArray(data)) {
          console.error('Daten sind kein Array:', data);
          return;
        }
        setCocktails(data);
      } catch (err) {
        console.error('Fehler beim Laden der Cocktails:', err);
      }
    }

    fetchCocktails();
  }, []);

  const filteredCocktails = cocktails.filter((cocktail) => {
    const textMatch =
      cocktail.name.toLowerCase().includes(search.toLowerCase()) ||
      cocktail.description.toLowerCase().includes(search.toLowerCase()) ||
      (cocktail.ingredients ?? []).some((ing) =>
        ing.toLowerCase().includes(search.toLowerCase())
      );

    const alcoholMatch =
      selectedAlcohol === 'none' ||
      (cocktail.ingredients ?? []).some((ing) =>
        ing.toLowerCase().includes(selectedAlcohol.toLowerCase())
      );

    const commonMatch =
      selectedCommon === 'none' ||
      (cocktail.ingredients ?? []).some((ing) =>
        ing.toLowerCase().includes(selectedCommon.toLowerCase())
      );

    return textMatch && alcoholMatch && commonMatch;
  });

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-10 flex flex-col items-center">
      {/* Filter section */}
      <div className="w-full max-w-2xl mb-8 sticky top-20 z-10  backdrop-blur rounded-lg shadow px-4 py-5 space-y-4">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Suche nach Cocktail oder Zutat..."
          className="w-full"
        />

        <div className="flex flex-wrap gap-4">
          {/* Alcohol Type Filter */}
          <Select onValueChange={(val) => setSelectedAlcohol(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Alkohol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Keine Auswahl</SelectItem>
              {ALCOHOL_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Common Ingredient Filter */}
          <Select onValueChange={(val) => setSelectedCommon(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Weitere Zutat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Keine Auswahl</SelectItem>
              {COMMON_INGREDIENTS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid view */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {filteredCocktails.length > 0 ? (
          filteredCocktails.map((cocktail, idx) => (
            <CocktailCard key={idx} cocktail={cocktail} />
          ))
        ) : (
          <p className="col-span-full text-gray-500">Keine Cocktails gefunden.</p>
        )}
      </div>
    </main>
  );
}
