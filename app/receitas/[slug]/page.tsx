import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import receitas from "@/data/receitas.json";

function formatTempo(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

export function generateStaticParams() {
  return receitas.map((r) => ({ slug: r.slug }));
}

export default async function PaginaReceita({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const receita = receitas.find((r) => r.slug === slug);
  if (!receita) notFound();

  return (
    <main className="min-h-screen bg-[#FDF6EC]">
      <div className="bg-[#3D2B1F] px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-[#C9A84C] text-sm font-medium flex items-center gap-1.5 hover:opacity-80 transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Volver
        </Link>
        <span className="text-[#F5E6D3] text-xs opacity-60">{receita.categoria}</span>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">

        {/* Banner */}
        <div className="rounded-2xl overflow-hidden shadow-md relative aspect-[4/3] w-full bg-[#E8D5B7]">
          <Image src={receita.imagem} alt={receita.nome} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <h1 className="text-white text-2xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {receita.nome}
            </h1>
            <div className="flex gap-4 mt-1 text-[#F5E6D3] text-sm">
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {formatTempo(receita.tempo)}
              </span>
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                {receita.porcoes} porciones
              </span>
            </div>
          </div>
        </div>

        {/* Versículo y contexto */}
        <div className="bg-[#F5E6D3] rounded-2xl p-4 border-l-4 border-[#C9A84C]">
          <div className="flex items-center gap-1.5 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A0785A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            <p className="text-[#A0785A] text-xs font-semibold uppercase tracking-wide">{receita.versiculo}</p>
          </div>
          <p className="text-[#3D2B1F] italic text-sm leading-relaxed mb-3">
            "{receita.texto_versiculo}"
          </p>
          <p className="text-[#5A4030] text-sm leading-relaxed">
            {receita.contexto_biblico}
          </p>
        </div>

        {/* Ingredientes */}
        <div>
          <h2 className="text-lg font-bold text-[#3D2B1F] mb-3 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A0785A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
            Ingredientes
          </h2>
          <div className="space-y-2">
            {receita.ingredientes.map((ing, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-[#E8D5B7]">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-[#3D2B1F]">{ing.item}</p>
                  <span className="text-sm text-[#A0785A] font-semibold ml-2 shrink-0">{ing.quantidade}</span>
                </div>
                <p className="text-xs text-[#5A7A3A] mt-0.5 flex items-center gap-1">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                  </svg>
                  {ing.nota_saude}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modo de preparación */}
        <div>
          <h2 className="text-lg font-bold text-[#3D2B1F] mb-3 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A0785A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 11h.01"/><path d="M11 15h.01"/><path d="M16 16h.01"/>
              <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16"/>
              <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4"/>
            </svg>
            Modo de Preparación
          </h2>
          <div className="space-y-3">
            {receita.modo_preparo.map((passo, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-[#E8D5B7] flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#A0785A] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-sm text-[#3D2B1F] leading-relaxed">{passo}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Consejo para diabéticos */}
        <div className="bg-[#C9A84C]/20 border border-[#C9A84C] rounded-2xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7A6020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
            <p className="text-[#7A6020] text-xs font-bold uppercase tracking-wide">Consejo para Diabéticos</p>
          </div>
          <p className="text-sm text-[#3D2B1F] leading-relaxed">{receita.dica_diabeticos}</p>
        </div>

        <div className="pb-4">
          <Link href="/" className="flex items-center justify-center gap-2 bg-[#A0785A] text-white py-3 rounded-xl font-medium hover:bg-[#8A6448] transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Ver más recetas
          </Link>
        </div>
      </div>
    </main>
  );
}
