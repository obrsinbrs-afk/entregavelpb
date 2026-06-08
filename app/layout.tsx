import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cosecha Sagrada — Recetas Bíblicas para una Vida Saludable",
  description: "50 recetas bíblicas saludables con versículos, historia y consejos para diabéticos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
