import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ImageCard({ src, alt, slug }: { src: string; alt: string; slug: string }) {
    return (
        <div className="border-none">
            <Link href={`/main/showcase/${slug}`}>
                <div className="flex">
                    <img src={src} alt={alt} className="rounded-lg" />
                </div>
            </Link>
        </div>
    )
}