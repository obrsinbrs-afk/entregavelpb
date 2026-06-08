"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderApp from "@/components/HeaderApp";
import FiltroCategoria from "@/components/FiltroCategoria";
import CardReceita from "@/components/CardReceita";
import receitas from "@/data/receitas.json";

export default function Home() {
  const [categoria, setCategoria] = useState("Todas");

  const filtradas = categoria === "Todas"
    ? receitas
    : receitas.filter((r) => r.categoria === categoria);

  return (
    <main className="min-h-screen bg-[#FDF6EC]">
      <HeaderApp />
      <div className="max-w-lg mx-auto">
        {/* Banner Vídeos Exclusivos */}
        <div className="px-4 pt-4">
          <Link href="/videos" className="block relative w-full rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "16/6" }}>
            <Image
              src="/images/banner-videos.jpg"
              alt="Vídeos Exclusivos"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center px-5 gap-4">
              <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center shrink-0 shadow-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
              <div>
                <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">Exclusivo</p>
                <p className="text-white font-bold text-base leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Videos Exclusivos
                </p>
                <p className="text-white/70 text-xs mt-0.5">5 videos saludables para diabéticos</p>
              </div>
            </div>
          </Link>
        </div>

        <FiltroCategoria ativa={categoria} onChange={setCategoria} />
        {filtradas.length === 0 ? (
          <div className="text-center py-16 text-[#A0785A] flex flex-col items-center gap-3">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#A0785A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
            <p className="font-medium">No se encontraron recetas en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 px-4 pb-8">
            {filtradas.map((r) => (
              <CardReceita
                key={r.id}
                slug={r.slug}
                nome={r.nome}
                categoria={r.categoria}
                tempo={r.tempo}
                imagem={r.imagem}
              />
            ))}
            {categoria === "Todas" && (
              <div className="rounded-2xl overflow-hidden border-2 border-dashed border-[#C9A84C] bg-[#3D2B1F] flex flex-col">
                {/* mockup de imagem bloqueada */}
                <div className="relative w-full aspect-[4/3] bg-[#2A1F17] flex items-center justify-center overflow-hidden">
                  {/* grade de cards desfocados simulando receitas */}
                  <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1 opacity-30 blur-[2px]">
                    {["#A0785A","#C9A84C","#8B6244","#B8956A"].map((c, i) => (
                      <div key={i} className="rounded-lg" style={{ background: c }} />
                    ))}
                  </div>
                  {/* cadeado centralizado */}
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-[#C9A84C]/20 border-2 border-[#C9A84C] flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                    <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">Próximamente</span>
                  </div>
                </div>
                {/* texto */}
                <div className="p-3 flex-1 flex flex-col justify-center">
                  <p className="text-[#C9A84C] font-bold text-sm leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    +50 Recetas
                  </p>
                  <p className="text-[#F5E6D3] text-[11px] mt-0.5 leading-snug opacity-80">
                    Nuevas recetas bíblicas próximamente
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
