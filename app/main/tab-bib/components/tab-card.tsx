import Link from "next/link";

type Tab = {
  id: number;
  title: string;
  artist: string;
  slug: string;
  pdf_url?: string;
};

export function TabCard({ tab }: { tab: Tab }) {
  return (
    <Link
      href={`/main/tab-bib/${tab.slug}`}
      className="group block rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-5 shadow-lg"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold group-hover:underline">{tab.title}</h3>
        <p className="text-sm text-gray-300">{tab.artist}</p>

        {tab.pdf_url && (
          <p className="text-xs text-blue-400 mt-2 group-hover:underline">
            PDF verfügbar
          </p>
        )}
      </div>
    </Link>
  );
}
