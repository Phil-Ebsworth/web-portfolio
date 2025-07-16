import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface ProjectCardProps {
  img: string;
  title: string;
  description: string;
  content: string;
  link: string;
  md_link: string;
}

export function ProjectCard({
  img,
  title,
  description,
  content,
  link,
  md_link,
  ...props
}: ProjectCardProps & React.HTMLAttributes<HTMLDivElement>) {
  const isPdf = md_link.toLowerCase().endsWith(".pdf");

  return (
    <Card
      className="w-full rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:border hover:border-white border border-transparent overflow-hidden"
      {...props}
    >
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <div className="relative w-full aspect-[16/9]">
          <img
            src={img}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 transition-all" />
        </div>
      </Link>

      <CardContent className="p-6 space-y-3">
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-base text-gray-300">
          {description}
        </CardDescription>

        {isPdf ? (
          <a
            href={`/projects/${md_link}`}
            download
            className="text-blue-500 underline text-sm"
          >
            Download PDF
          </a>
        ) : null}
      </CardContent>
    </Card>
  );
}
