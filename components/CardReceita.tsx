import Link from "next/link";
import Image from "next/image";

interface Props {
  slug: string;
  nome: string;
  categoria: string;
  tempo: number;
  imagem: string;
}

function formatTempo(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

export default function CardReceita({ slug, nome, categoria, tempo, imagem }: Props) {
  return (
    <Link href={`/receitas/${slug}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8D5B7] hover:shadow-md transition-shadow">
        <div className="relative w-full aspect-[4/3] bg-[#F5E6D3]">
          <Image
            src={imagem}
            alt={nome}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 200px"
          />
        </div>
        <div className="p-3">
          <span className="inline-block bg-[#F5E6D3] text-[#A0785A] text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1 uppercase tracking-wide">
            {categoria}
          </span>
          <h3 className="text-sm font-bold text-[#3D2B1F] leading-tight line-clamp-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {nome}
          </h3>
          <p className="text-xs text-[#A0785A] mt-1 flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {formatTempo(tempo)}
          </p>
        </div>
      </div>
    </Link>
  );
}
