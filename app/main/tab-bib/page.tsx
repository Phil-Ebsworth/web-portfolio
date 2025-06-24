'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PdfDropzone from './components/PdfDropzone';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationItem, PaginationContent, PaginationPrevious, PaginationNext, PaginationLink } from '@/components/ui/pagination';

type Tab = {
  id: number;
  title: string;
  artist: string;
  tab_data: string;
  pdf_url?: string;
  slug: string;
};

export default function TabListPage() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tabsPerPage = 6;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const res = await fetch('/main/tab-bib/api/tabs');
        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        if (Array.isArray(data)) {
          setTabs(data);
        } else {
          throw new Error('Datenformat ungültig');
        }
      } catch (err: any) {
        setError(err.message || 'Fehler beim Laden der Tabs');
        setTabs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTabs();
  }, []);

  const filteredTabs = tabs.filter((tab) =>
    `${tab.title} ${tab.artist}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTabs.length / tabsPerPage);
  const paginatedTabs = filteredTabs.slice(
    (currentPage - 1) * tabsPerPage,
    currentPage * tabsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Gitarren Tabs</h1>

      <Input
        type="text"
        placeholder="Suche nach Titel oder Künstler..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // Zurück zur ersten Seite bei neuer Suche
        }}
        className="w-full p-2 border rounded mb-6"
      />

      {loading && <p>Lade Tabs...</p>}
      {error && <p>{error}</p>}
      {!loading && filteredTabs.length === 0 && !error && <p>Keine Tabs gefunden.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-6">
        {paginatedTabs.map((tab) => (
          <Link
            key={tab.id}
            href={`/main/tab-bib/${tab.slug}`}
            className="block p-4 border rounded hover:shadow transition"
          >
            <h2 className="text-lg font-semibold">{tab.title}</h2>
            <p className="text-sm text-gray-600">{tab.artist}</p>
          </Link>
        ))}
      </div>

      {filteredTabs.length > tabsPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePrev();
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Upload Section */}
      {session?.user?.id === '64b70ef4-c7ca-4fcf-b454-64b1a42d35cd' && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">PDF Hochladen</h2>
          <p className="text-sm text-gray-500 mb-4">
            Lade eine PDF-Datei mit Gitarren Tabs hoch, um sie in der Bibliothek verfügbar zu machen.
          </p>
          <PdfDropzone />
        </div>
      )}
    </div>
  );
}
