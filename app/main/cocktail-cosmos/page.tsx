export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 p-6 max-w-5xl mx-auto">
      {/* Specials */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Unsere Specials</h2>
        <div className="grid gap-6">
          <Card
            title="Summer Breeze"
            image="/cocktails/limoncello-spritz.png"
            description="Frisch, fruchtig, perfekt für heiße Tage."
            link="/main/cocktail-cosmos/sommerkarte"
          />
        </div>
      </section>

      {/* Top Cocktails */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Beliebte Klassiker</h2>
        <div className="grid gap-6">
          <Card
            title="Margarita"
            image="/cocktails/margarita.png"
            description="Salzig-sauer, eiskalt – der mexikanische Kult-Drink."
            link="/cocktails/margarita"
          />
          <Card
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
        <Card
          title="Gin Basil Smash"
          image="/cocktails/gin-basil-smash.png"
          description="Frischer Basilikum trifft auf zitronige Frische – grün, modern, herb."
          link="/cocktails/gin-basil-smash"
        />
      </section>
    </div>
  );
}

type CardProps = {
  title: string;
  image: string;
  description: string;
  link: string;
};

function Card({ title, image, description, link }: CardProps) {
  return (
    <a
      href={link}
      className="flex flex-col md:flex-row bg-white/5 hover:bg-white/10 transition p-4 rounded-2xl shadow-lg backdrop-blur-md"
    >
      <div className="w-full md:w-48 aspect-square relative mb-4 md:mb-0 md:mr-6">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
        />
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-3">{description}</p>
        <span className="inline-block text-blue-300 hover:underline">Zum Rezept →</span>
      </div>
    </a>
  );
}

