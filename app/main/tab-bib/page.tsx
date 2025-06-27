'use client';

import { useEffect, useState } from 'react';
import PdfDropzone from './components/PdfDropzone';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationItem,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from '@/components/ui/pagination';
import { TabCard } from './components/tab-card';

/* ----------------------------- Typdefinition ----------------------------- */
type Tab = {
  id: number;
  title: string;
  artist: string;
  tab_data: string;
  pdf_url?: string;
  slug: string;
};

/* ------------------------------------------------------------------------ */
export default function TabListPage() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tabsPerPage = 12;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  /* ------------------------------ Fetch Tabs ----------------------------- */
  useEffect(() => {
    (async () => {
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
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------------------- Such- & Paging --------------------------- */
  const filteredTabs = tabs.filter((tab) =>
    `${tab.title} ${tab.artist}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTabs.length / tabsPerPage);
  const paginatedTabs = filteredTabs.slice(
    (currentPage - 1) * tabsPerPage,
    currentPage * tabsPerPage
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  /* -------------------------------- Render ------------------------------ */
  return (
    <div className="w-full max-w-screen-xl mx-auto px-6 py-10">
      {/* Kopfzeile & Suche */}
      <h1 className="text-4xl font-bold mb-8">Gitarren Tabs</h1>

      <Input
        type="text"
        placeholder="Suche nach Titel oder Künstler..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full max-w-xl p-3 border rounded mb-10"
      />

      {/* Statusmeldungen */}
      {loading && <p>Lade Tabs …</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && filteredTabs.length === 0 && !error && (
        <p>Keine Tabs gefunden.</p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-10">
        {paginatedTabs.map((tab) => (
          <TabCard key={tab.id} tab={tab} />
        ))}
      </div>

      {/* Pagination */}
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
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
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
                className={
                  currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Upload-Bereich (nur Admin) */}
      {session?.user?.id === '64b70ef4-c7ca-4fcf-b454-64b1a42d35cd' && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">PDF hochladen</h2>
          <p className="text-sm text-gray-500 mb-6">
            Lade eine PDF-Datei mit Gitarren-Tabs hoch, um sie in der Bibliothek
            verfügbar zu machen.
          </p>
          <PdfDropzone />
        </div>
      )}
    </div>
  );
}
