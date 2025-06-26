'use client';

import Link from 'next/link';

export type CocktailCardProps = {
  title: string;
  image: string;
  description: string;
  link: string;
};

export function CocktailCard({ title, image, description, link }: CocktailCardProps) {
  return (
    <Link
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
    </Link>
  );
}
