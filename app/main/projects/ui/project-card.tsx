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
    md_link?: string;
}

export function ProjectCard({
    img,
    title,
    description,
    content,
    link,
    md_link,
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
                    <Link href={`/main/projects/${md_link}`} passHref>
                        <Button variant="link" className="p-0 h-auto mt-2">
                            Read more
                        </Button>
                    </Link>
                </CardContent>
            </Link>
        </Card>
    )
}
