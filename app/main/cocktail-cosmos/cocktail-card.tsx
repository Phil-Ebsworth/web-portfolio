import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cocktail } from "@/lib/definitions";

export default function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  return (
    <Link
      href={`/main/cocktail-cosmos/${cocktail.slug}`}
      className="block w-full max-w-5xl mx-auto"
    >
      <Card className="flex flex-col md:flex-row items-stretch overflow-hidden hover:shadow-xl transition duration-200 cursor-pointer">
        <div className="md:w-2/3 p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-2xl">{cocktail.name}</CardTitle>
            <CardDescription>{cocktail.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-sm text-muted-foreground">Mehr erfahren →</p>
          </CardContent>
        </div>

        <div className="md:w-1/3 w-full aspect-square relative">
          <Image
            src={cocktail.image_url}
            alt={cocktail.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </Card>
    </Link>
  );
}
