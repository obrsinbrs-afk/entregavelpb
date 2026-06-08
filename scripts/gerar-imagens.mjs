const FAL_KEY = "38cd4ba4-ab4b-4e1f-8a2b-589ac50edb03:a0d7bba30c120843348079f35456a9bb";

const receitas = [
  { slug: "pao-de-cevada-de-elias", prompt: "Artisan barley bread on rustic wooden table, warm golden light, biblical middle eastern style, healthy food photography, soft brown tones" },
  { slug: "sopa-de-lentilha-de-esau", prompt: "Red lentil soup in clay bowl, steam rising, rustic biblical setting, olive oil drizzle, fresh herbs, warm earthy tones, food photography" },
  { slug: "peixe-grelhado-de-tiberias", prompt: "Grilled fish fillet with fresh herbs and lemon on stone plate, biblical galilean style, olive oil drizzle, rosemary, warm golden light, food photography" },
  { slug: "salada-de-figos-de-abraao", prompt: "Fresh fig salad with arugula walnuts and cottage cheese, biblical middle eastern cuisine, beautiful plating, warm natural light, food photography" },
  { slug: "pure-de-grao-de-bico-de-daniel", prompt: "Creamy hummus in clay bowl with olive oil paprika and chickpeas, middle eastern biblical food, warm earthy tones, food photography" },
  { slug: "frango-com-ervas-de-salomao", prompt: "Herb roasted chicken breast with rosemary thyme and garlic, golden brown, biblical middle eastern style, warm light, food photography" },
  { slug: "caldo-verde-biblico", prompt: "Green kale soup in rustic bowl, olive oil drizzle, steam rising, simple biblical food, warm earthy tones, food photography" },
  { slug: "tamara-recheada-com-nozes", prompt: "Medjool dates stuffed with walnuts and cream cheese, middle eastern dessert, wooden board, warm golden light, food photography" },
  { slug: "ensopado-de-peixe-da-galileia", prompt: "Fish stew with tomatoes peppers and herbs in clay pot, biblical galilean recipe, steam rising, warm food photography" },
  { slug: "pasta-de-azeitona-com-ervas", prompt: "Olive tapenade with fresh herbs in small bowl, middle eastern biblical food, olive branches around, warm natural light, food photography" },
  { slug: "ovo-poche-com-azeite-e-ervas", prompt: "Poached egg with olive oil fresh parsley and chives on white plate, simple healthy breakfast, warm light, elegant food photography" },
  { slug: "sopa-de-abobora-com-gengibre", prompt: "Creamy pumpkin soup with ginger in rustic bowl, golden color, toasted seeds on top, warm autumn tones, food photography" },
  { slug: "salada-de-pepino-e-alho-poro", prompt: "Cucumber and leek salad with greek yogurt and fresh mint, middle eastern style, refreshing, light food photography" },
  { slug: "mingau-de-cevada-com-mel", prompt: "Barley porridge with honey almonds and banana, warm breakfast bowl, biblical middle eastern style, cozy food photography" },
  { slug: "caldo-de-legumes-da-terra-prometida", prompt: "Hearty vegetable broth with chickpeas carrots zucchini and herbs, biblical promised land recipe, rustic pot, warm food photography" },
];

async function gerarImagem(receita) {
  console.log(`Gerando: ${receita.slug}...`);
  const res = await fetch("https://fal.run/fal-ai/flux/schnell", {
    method: "POST",
    headers: {
      Authorization: `Key ${FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: receita.prompt,
      image_size: "landscape_4_3",
      num_images: 1,
    }),
  });
  const data = await res.json();
  const url = data.images?.[0]?.url;
  if (!url) {
    console.error(`Erro em ${receita.slug}:`, JSON.stringify(data));
    return null;
  }
  console.log(`OK: ${receita.slug} -> ${url}`);
  return { slug: receita.slug, url };
}

// Gera em lotes de 5 para não sobrecarregar
async function main() {
  const resultados = [];
  for (let i = 0; i < receitas.length; i += 5) {
    const lote = receitas.slice(i, i + 5);
    const res = await Promise.all(lote.map(gerarImagem));
    resultados.push(...res.filter(Boolean));
    if (i + 5 < receitas.length) {
      console.log("Aguardando 2s...");
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  console.log("\n=== RESULTADO FINAL ===");
  console.log(JSON.stringify(resultados, null, 2));
}

main();
