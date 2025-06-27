import Link from "next/link";
import { Tab } from "@/lib/definitions";

export function TabCard({ tab }: { tab: Tab }) {
  return (
    <Link
      href={`/main/tab-bib/${tab.slug}`}
      className="group block rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-5 shadow-lg"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold group-hover:underline">{tab.title}</h3>
        <p className="text-sm">{tab.artist}</p>
      </div>
    </Link>
  );
}
