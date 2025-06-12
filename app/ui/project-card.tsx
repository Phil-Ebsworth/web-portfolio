import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { fetchProjects } from "@/app/lib/data";

interface ProjectCardProps {
    img: string;
    title: string;
    description: string;
    content: string;
    link: string;
}

export function ProjectCard({
    img,
    title,
    description,
    content,
    link,
    ...props
}: ProjectCardProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>) {
    return (
        <Card
            className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 hover:border hover:border-white border-0"
            {...props}
        >
            <Link href={link} target="_blank" rel="noopener noreferrer">
            <CardHeader>
            <img
            src={img.toString()}
            alt={img.toString()}
            className="rounded-xl h-48"
            />
            </CardHeader>
            <CardContent>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            </CardContent>
            </Link>
        </Card>
    )
}
