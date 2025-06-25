'use client';

import Link from "next/link";
import React from "react";

type ImageCardProps = {
  src: string;
  alt: string;
  slug: string;
  onClick?: () => void; // optional
};

export default function ImageCard({ src, alt, slug, onClick }: ImageCardProps) {
  const content = (
    <div className="flex">
      <img src={src} alt={alt} className="rounded-lg" />
    </div>
  );

  return (
    <div className="border-none cursor-pointer">
      {onClick ? (
        <div onClick={onClick}>{content}</div>
      ) : (
        <Link href={`/main/showcase/${slug}`}>{content}</Link>
      )}
    </div>
  );
}
