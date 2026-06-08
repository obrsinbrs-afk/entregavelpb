import receitas from "@/data/receitas.json";

function getVersiculo() {
  const now = new Date(new Date().toISOString());
  const start = new Date(now.getUTCFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  return receitas[day % receitas.length];
}

export default function HeaderApp() {
  const receita = getVersiculo();
  return (
    <header className="bg-[#3D2B1F] text-[#FDF6EC] px-4 pt-6 pb-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#A0785A]/30 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Cosecha Sagrada
            </h1>
            <p className="text-[#C9A84C] text-xs">Recetas Bíblicas para una Vida Saludable</p>
          </div>
        </div>
        <div className="bg-[#4D3B2F] rounded-xl p-3 border-l-4 border-[#C9A84C]">
          <div className="flex items-center gap-1.5 mb-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-wide">Versículo del Día</p>
          </div>
          <p className="text-sm italic text-[#F5E6D3] leading-relaxed line-clamp-2">
            "{receita.texto_versiculo}"
          </p>
          <p className="text-[#C9A84C] text-xs mt-1">— {receita.versiculo}</p>
        </div>
      </div>
    </header>
  );
}
