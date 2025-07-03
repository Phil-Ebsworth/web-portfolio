import { CocktailCard } from './ui/special-card';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 p-6 max-w-5xl mx-auto">
      {/* Specials */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Sammlungen</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <CocktailCard
            title="Summer Top-10"
            image="/cocktails/limoncello-spritz.png"
            description="Perfekt für heiße Tage – erfrischend und spritzig!"
            link="/main/cocktail-cosmos/sommerkarte"
          />
          <CocktailCard
            title="Klassiker"
            image="/cocktails/old-fashioned.png"
            description="die Klasiker unter den Cocktails – zeitlos und beliebt."
            link="/main/cocktail-cosmos/classics"
          />
        </div>
      </section>

      {/* Klassiker */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Beliebte Drinks</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <CocktailCard
            title="Espresso Martini"
            image="/cocktails/espresso-martini.png"
            description="Salzig-sauer, eiskalt – der mexikanische Kult-Drink."
            link="/main/cocktail-cosmos/espresso-martini"
          />
          <CocktailCard
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
        <CocktailCard
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
