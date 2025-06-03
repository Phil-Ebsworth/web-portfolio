import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ImageCardProps = React.HTMLAttributes<HTMLDivElement> & {
    src: string;
    alt: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    footer?: React.ReactNode;
    imageClassName?: string;
};

const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
    (
        {
            src,
            alt,
            title,
            description,
            footer,
            className,
            imageClassName,
            ...props
        },
        ref
    ) => (
        <div
            ref={ref}
            className={cn(
            "rounded-xl border bg-card text-card-foreground shadow overflow-hidden flex flex-col",
            className
            )}
            {...props}
        >
            <div className="relative w-full flex-1 min-h-0">
            <Image
                src={src}
                alt={alt}
                fill
                className={cn("object-cover w-full h-full", imageClassName)}
                sizes="(max-width: 768px) 100vw, 400px"
                style={{ objectFit: "cover" }}
            />
            </div>
            {(title || description) && (
            <div className="p-4">
                {title && (
                <div className="font-semibold leading-none tracking-tight mb-1">
                    {title}
                </div>
                )}
                {description && (
                <div className="text-sm text-muted-foreground">{description}</div>
                )}
            </div>
            )}
            {footer && (
            <div className="flex items-center p-4 pt-0">{footer}</div>
            )}
        </div>
    )
);

ImageCard.displayName = "ImageCard";

export { ImageCard };