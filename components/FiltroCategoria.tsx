"use client";

const CATEGORIAS = [
  "Todas",
  "Panes & Granos",
  "Pescados",
  "Verduras & Legumbres",
  "Miel & Frutas",
  "Aceite & Hierbas",
  "Sopas & Caldos",
];

interface Props {
  ativa: string;
  onChange: (cat: string) => void;
}

export default function FiltroCategoria({ ativa, onChange }: Props) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 px-4 py-3 w-max">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              ativa === cat
                ? "bg-[#A0785A] text-white shadow-md"
                : "bg-[#F5E6D3] text-[#3D2B1F] hover:bg-[#E8D5B7]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
