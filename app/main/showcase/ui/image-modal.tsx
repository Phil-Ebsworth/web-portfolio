'use client';

import { Image } from '@/lib/definitions';

export default function ImageModal({
  image,
  onClose,
}: {
  image: Image | null;
  onClose: () => void;
}) {
  if (!image) return null;

  const formattedDate = new Date(image.created_at).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="relative  p-6 rounded-xl shadow-2xl w-[90vw] h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-3xl text-gray-700 hover:text-black"
        >
          &times;
        </button>
        {/* Title above image for small screens */}
        <h2 className="text-xl font-bold md:hidden text-center">{image.title}</h2>
        <div className="flex h-full gap-8">
          {/* Left: Info */}
          <div className="w-[30%] flex flex-col justify-center overflow-y-auto pr-4 hidden md:block">
            <h2 className="text-2xl font-bold mb-4 hidden md:block">{image.title}</h2>
            <p className="text-sm mb-3 hidden lg:block">
              <strong>Prompt:</strong><br />
              {image.prompt}
            </p>
            <p className="text-sm mb-3 hidden md:block">
              <strong>Beschreibung:</strong><br />
              {image.description}
            </p>
            <p className="text-xs mt-auto hidden md:block">
              <strong>Erstellt am:</strong> {formattedDate}
            </p>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-[70%] flex items-center justify-center">
            <img
              src={image.url}
              alt={image.title}
              className="max-h-full max-w-full object-contain mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
