import { CocktailCard } from './ui/special-card';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 p-6 max-w-5xl mx-auto">
      {/* Specials */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Unsere Specials</h2>
        <div className="grid gap-6">
          <CocktailCard
            title="Summer Top-10"
            image="/cocktails/limoncello-spritz.png"
            description="Perfekt für heiße Tage – erfrischend und spritzig!"
            link="/main/cocktail-cosmos/sommerkarte"
          />
        </div>
      </section>

      {/* Klassiker */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Beliebte Klassiker</h2>
        <div className="grid gap-6">
          <CocktailCard
            title="Espresso Martini"
            image="/cocktails/espresso-martini.png"
            description="Salzig-sauer, eiskalt – der mexikanische Kult-Drink."
            link="/cocktails/esspresso-martini"
          />
          <CocktailCard
            title="Long Island Iced Tea"
            image="/cocktails/long-island-iced-tea.png"
            description="Ein starker Mix mit Cola-Finish – nicht für Anfänger!"
            link="/cocktails/long-island-iced-tea"
          />
        </div>
      </section>

      {/* Cocktail der Woche */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Cocktail der Woche</h2>
        <CocktailCard
          title="Gin Basil Smash"
          image="/cocktails/gin-basil-smash.png"
          description="Frischer Basilikum trifft auf zitronige Frische – grün, modern, herb."
          link="/cocktails/gin-basil-smash"
        />
      </section>
    </div>
  );
}
