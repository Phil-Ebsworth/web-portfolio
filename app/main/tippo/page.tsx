'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [texts, setTexts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/main/tippo/api/texts')
      .then(res => res.json())
      .then(setTexts)
      .catch(console.error);
  }, []);

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tipp einen Text</h1>
      <ul className="space-y-4">
        {texts.map(t => (
          <li key={t.slug}>
            <Link href={`/main/tippo/${t.slug}`} className="text-xl text-blue-600 hover:underline">
              {t.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
