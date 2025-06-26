import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Cocktail } from '@/lib/definitions';

export default function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  return (
    <Link
      href={`/main/cocktail-cosmos/${cocktail.slug}`}
      className="block w-full max-w-5xl mx-auto"
    >
      <Card className="flex flex-row items-center w-full overflow-hidden hover:shadow-xl transition duration-200 cursor-pointer">
        <div className="w-2/3 p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-2xl">{cocktail.name}</CardTitle>
            <CardDescription>{cocktail.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-sm text-muted-foreground">Mehr erfahren →</p>
          </CardContent>
        </div>

        <div className="w-1/3 h-full">
          <Image
            src={cocktail.image_url}
            alt={cocktail.name}
            width={400}
            height={250}
            className="object-cover w-full h-full"
          />
        </div>
      </Card>
    </Link>
  );
}
