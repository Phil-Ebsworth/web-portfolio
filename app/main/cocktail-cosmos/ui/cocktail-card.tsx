import Link from "next/link";
import { Cocktail } from "@/lib/definitions";

export type CocktailCardProps = {
  title: string;
  image: string;
  description: string;
  link: string;
};

export function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  return (
    <Link
      href={`/main/cocktail-cosmos/${cocktail.slug}`}
      className="flex flex-col md:flex-row hover:bg-white/10 transition p-4 rounded-2xl shadow-lg backdrop-blur-md"
    >
      <div className="w-full md:w-48 aspect-square relative mb-4 md:mb-0 md:mr-6">
      <img
        src={cocktail.image_url}
            alt={cocktail.name}
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
      </div>
      <div className="flex flex-col justify-start md:w-1/2">
        <h3 className="text-2xl font-semibold mb-2">{cocktail.name}</h3>
        <p className="text-sm text-gray-300 mb-3">{cocktail.description}</p>
      </div>
    </Link>
  );
}

export function SpecialCard({ title, image, description, link }: CocktailCardProps) {
  return (
    <Link
      href={link}
      className="flex flex-col md:flex-row hover:bg-white/10 transition p-4 rounded-2xl shadow-lg backdrop-blur-md"
    >
      <div className="w-full md:w-48 aspect-square relative mb-4 md:mb-0 md:mr-6">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
      </div>
      <div className="flex flex-col justify-start md:w-1/2">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-3">{description}</p>
      </div>
    </Link>
  );
}