"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const VIDEOS = [
  {
    id: "NOSkfZQdFyc",
    titulo: "Menú Semanal: 4 Recetas para Diabéticos",
    thumbnail: "/images/video-menu-semanal-diabeticos.jpg",
    ingredientes: [
      "Pechuga de pollo sin piel",
      "Verduras de temporada (zanahoria, calabacita, brócoli)",
      "Aceite de oliva extra virgen",
      "Ajo y cebolla",
      "Hierbas frescas (tomillo, romero)",
      "Limón y especias naturales",
    ],
  },
  {
    id: "7ZenQNNeWaE",
    titulo: "Menú Semanal para Diabéticos Fácil y Económico",
    thumbnail: "/images/video-almuerzo-diabetes.jpg",
    ingredientes: [
      "Legumbres (lentejas, garbanzos, frijoles)",
      "Verduras de hoja verde (espinaca, col rizada)",
      "Huevo de rancho",
      "Tomate y pimiento",
      "Aceite de oliva",
      "Especias: comino, cúrcuma, pimienta",
    ],
  },
  {
    id: "TJ33GmFeAUM",
    titulo: "7 Deliciosas Recetas para Diabéticos",
    thumbnail: "/images/video-7-recetas-diabeticos.jpg",
    ingredientes: [
      "Proteínas magras (pollo, pescado, huevo)",
      "Verduras sin almidón (pepino, lechuga, apio)",
      "Frutos secos (nueces, almendras)",
      "Yogur griego sin azúcar",
      "Aceite de oliva y limón",
      "Hierbas aromáticas frescas",
    ],
  },
  {
    id: "UTmDH899jXU",
    titulo: "25 Recetas para Diabetes: Desayuno, Almuerzo y Cena",
    thumbnail: "/images/video-25-recetas-diabetes.jpg",
    ingredientes: [
      "Avena integral sin azúcar",
      "Frutas de bajo índice glucémico (manzana, pera, frutos rojos)",
      "Proteínas (atún, salmón, pollo)",
      "Verduras asadas al horno",
      "Semillas de chía y linaza",
      "Canela y jengibre como especias naturales",
    ],
  },
  {
    id: "uhIQMB7wvcI",
    titulo: "4 Ensaladas Saludables Sin Azúcar para Diabéticos",
    thumbnail: "/images/video-ensaladas-sin-azucar.jpg",
    ingredientes: [
      "Lechuga romana y arúgula",
      "Tomate cherry y pepino",
      "Atún o pechuga de pollo a la plancha",
      "Aguacate maduro",
      "Aceite de oliva y vinagre de manzana",
      "Nueces y semillas de girasol",
    ],
  },
];

export default function VideosPage() {
  const [videoAberto, setVideoAberto] = useState<(typeof VIDEOS)[0] | null>(null);

  return (
    <main className="min-h-screen bg-[#FDF6EC]">
      {/* Header */}
      <div className="bg-[#3D2B1F] px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-[#C9A84C] text-sm font-medium flex items-center gap-1.5 hover:opacity-80 transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Volver
        </Link>
        <span className="text-[#F5E6D3] text-xs opacity-60">Videos Exclusivos</span>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold text-[#3D2B1F]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Videos Exclusivos
        </h1>
        <p className="text-sm text-[#A0785A] -mt-2">Recetas saludables para diabéticos en video</p>

        {VIDEOS.map((v) => (
          <button
            key={v.id}
            onClick={() => setVideoAberto(v)}
            className="w-full text-left bg-white rounded-2xl overflow-hidden border border-[#E8D5B7] shadow-sm hover:shadow-md transition-shadow block"
          >
            <div className="relative w-full aspect-video bg-[#E8D5B7]">
              <Image src={v.thumbnail} alt={v.titulo} fill className="object-cover" />
              {/* play overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#C9A84C] flex items-center justify-center shadow-lg">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="none">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm font-semibold text-[#3D2B1F] leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                {v.titulo}
              </p>
              <p className="text-xs text-[#A0785A] mt-1 flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Toca para ver
              </p>
            </div>
          </button>
        ))}

        {/* Em breve */}
        <div className="bg-[#3D2B1F] rounded-2xl p-6 flex flex-col items-center text-center border-2 border-dashed border-[#C9A84C]">
          <div className="w-12 h-12 rounded-full bg-[#C9A84C]/20 border-2 border-[#C9A84C] flex items-center justify-center mb-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
          <p className="text-[#C9A84C] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Próximamente</p>
          <p className="text-[#F5E6D3] text-sm mt-1 opacity-80">Más videos exclusivos serán publicados pronto</p>
        </div>

        <div className="pb-4">
          <Link href="/" className="flex items-center justify-center gap-2 bg-[#A0785A] text-white py-3 rounded-xl font-medium hover:bg-[#8A6448] transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Ver recetas
          </Link>
        </div>
      </div>

      {/* Modal de vídeo */}
      {videoAberto && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-10 px-4 pb-6 overflow-y-auto"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setVideoAberto(null)}
        >
          <div
            className="w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* botão fechar */}
            <div className="flex justify-end mb-3">
              <button
                onClick={() => setVideoAberto(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* vídeo */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${videoAberto.id}?autoplay=1`}
                title={videoAberto.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* título */}
            <h2 className="text-white text-lg font-bold mt-4 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              {videoAberto.titulo}
            </h2>

            {/* ingredientes */}
            <div className="bg-[#F5E6D3] rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A0785A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
                <p className="text-[#A0785A] text-xs font-bold uppercase tracking-wide">Ingredientes del Video</p>
              </div>
              <ul className="space-y-2">
                {videoAberto.ingredientes.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#3D2B1F]">
                    <div className="w-5 h-5 rounded-full bg-[#A0785A] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white text-[10px] font-bold">{i + 1}</span>
                    </div>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
