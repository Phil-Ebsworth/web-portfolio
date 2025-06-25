'use client'
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ImagePage() {
    const { slug } = useParams<{ slug: string }>();
    const [image, setImage] = useState<ImageData | null>(null);
    const [loading, setLoading] = useState(true);

    type ImageData = {
        url: string;
        title: string;
        description: string;
        created_at: string;
        prompt: string;
        category: string;
    }
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await fetch(`/main/showcase/api/img/${slug}`);
                if (!res.ok) throw new Error('Not found');
                const data = await res.json();
                setImage(data);
            } catch (error) {
                console.error('Fehler beim Laden des Bildes:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchImage();
    }, [slug]);

    if (loading) return <div>Loading...</div>;
    if (!image) return <div>Image not found</div>;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                height: '80vh',
                flexWrap: 'wrap',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '90vh',
                    maxHeight: '90vh',
                    marginLeft: '2rem',
                    flex: '0 1 auto',
                    width: 'auto',
                }}
                className="image-container"
            >
                <img
                    src={image.url}
                    alt={image.title}
                    style={{
                        height: '90vh',
                        width: 'auto',
                        maxWidth: '90vw',
                        objectFit: 'cover',
                        flexShrink: 0,
                        display: 'block',
                    }}
                    className="showcase-img"
                />
            </div>
            <div
                style={{
                    marginLeft: '2rem',
                    maxWidth: '600px',
                    flex: '1 1 400px',
                    minWidth: '300px',
                }}
                className="image-details"
            >
                <h2 className="text-lg font-semibold">Details</h2>
                <Separator orientation="horizontal" className="my-2" />
                <p><strong>Title:</strong></p>
                <p>{image.title}</p>
                <Separator orientation="horizontal" className="my-2" />
                <p><strong>Description:</strong></p>
                <p>{image.description}</p>
                <Separator orientation="horizontal" className="my-2" />
                <p><strong>Prompt:</strong></p>
                <p> {image.prompt}</p>
                <Separator orientation="horizontal" className="my-2" />
                <p><strong>Category:</strong> {image.category}</p>
                <Separator orientation="horizontal" className="my-2" />
                <p><small>Created at: {new Date(image.created_at).toLocaleString()}</small></p>
            </div>
            <style jsx>{`
                @media (max-width: 800px), (max-height: 700px) {
                    div[style*="display: flex"] {
                        flex-direction: column !important;
                        align-items: center !important;
                        height: auto !important;
                    }
                    .image-details {
                        margin-left: 2rem !important;
                        margin-right: 2rem !important;
                        margin-top: 2rem;
                        max-width: 90vw;
                    }
                    .image-container {
                        width: 100vw !important;
                        margin-left: 0 !important;
                        height: auto !important;
                        max-height: none !important;
                    }
                    .showcase-img {
                        height: 50vh !important;
                        max-width: 100vw !important;
                        width: 100vw !important;
                        object-fit: contain !important;
                    }
                }
            `}</style>
        </div>
    );
}