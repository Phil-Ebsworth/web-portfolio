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
        <Card className="w-full @container/card">
            <div className="overflow-hidden">
                <img
                    src={img.toString()}
                    alt={img.toString()}
                    className="w-full h-40 rounded-t-xl"
                    style={{ objectFit: "cover" }}
                />
            </div>
            <CardHeader>
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{content}</p>
            </CardContent>
            <CardFooter>
                <Link
                    href={link.toString()}
                    className="text-primary hover:underline font-medium"
                >
                    View Details
                </Link>
            </CardFooter>
        </Card>
    )
}
