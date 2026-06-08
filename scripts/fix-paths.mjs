import fs from "fs";

const json = fs.readFileSync("data/receitas.json", "utf8");

const substituicoes = {
  "https://v3b.fal.media/files/b/0a9d67e3/7Vb9eYB6H7w6G99023Xac.jpg": "/images/pan-de-cebada-de-elias.jpg",
  "https://v3b.fal.media/files/b/0a9d67e3/3mtvlzkDDhWHztm3Q9ryb.jpg": "/images/sopa-de-lentejas-de-esau.jpg",
  "https://v3b.fal.media/files/b/0a9d67e3/92Fx7cPkHdslp61VmiGA2.jpg": "/images/pescado-a-la-plancha-de-tiberias.jpg",
  "https://v3b.fal.media/files/b/0a9d67e3/DI8Yh5wrqNRqxto4lmbIJ.jpg": "/images/ensalada-de-higos-de-abraham.jpg",
  "https://v3b.fal.media/files/b/0a9d67e3/PG_0C9xb5hkwe7Xb_la-X.jpg": "/images/pure-de-garbanzo-de-daniel.jpg",
  "https://v3b.fal.media/files/b/0a9d67e8/BK7LpLwq0yhWpGm0EyRIB.jpg": "/images/pollo-con-hierbas-de-salomon.jpg",
  "https://v3b.fal.media/files/b/0a9d67e3/qP8y-utWIvQRAIm75QDCS.jpg": "/images/caldo-verde-biblico.jpg",
  "https://v3b.fal.media/files/b/0a9d67e3/k_qC84KuvJy5Z5oKgr_ga.jpg": "/images/datiles-rellenos-con-nueces.jpg",
  "https://v3b.fal.media/files/b/0a9d67e8/zAgG6MB--3E4ZmZ2_5JdZ.jpg": "/images/guiso-de-pescado-del-mar-de-galilea.jpg",
  "https://v3b.fal.media/files/b/0a9d67e3/nTqDt9o-p_BQQmI_UEoEY.jpg": "/images/pasta-de-aceitunas-con-hierbas.jpg",
  "https://v3b.fal.media/files/b/0a9d67e3/sxsgt6ackddT1vcEKgqsX.jpg": "/images/huevos-pochados-con-aceite-y-hierbas.jpg",
  "https://v3b.fal.media/files/b/0a9d67e8/LkD5dAyV8McKRTJfAK2vU.jpg": "/images/sopa-de-calabaza-con-jengibre.jpg",
  "https://v3b.fal.media/files/b/0a9d67e8/X8snGwVQvlQCgD6KySPcA.jpg": "/images/ensalada-de-pepino-y-poro.jpg",
  "https://v3b.fal.media/files/b/0a9d67e4/Ja0jzAywc1BEicgYL2jzh.jpg": "/images/atole-de-cebada-con-miel.jpg",
  "https://v3b.fal.media/files/b/0a9d67e3/Tn0n0_swOs-L1kWE0EcZo.jpg": "/images/caldo-de-verduras-de-la-tierra-prometida.jpg",
};

// Restaurar o JSON original correto (sem corrupção de encoding)
// Reescrever direto a partir das receitas originais com paths locais
const receitas = JSON.parse(json);

// Verificar se já está corrompido
const corrompido = json.includes("Ã");

if (corrompido) {
  console.log("JSON corrompido detectado. Restaurando...");
  // Não tem como restaurar automaticamente — reportar
  console.log("ERRO: O arquivo JSON está com encoding corrompido. Precisa ser restaurado manualmente.");
  process.exit(1);
} else {
  let resultado = json;
  for (const [de, para] of Object.entries(substituicoes)) {
    resultado = resultado.replaceAll(de, para);
  }
  fs.writeFileSync("data/receitas.json", resultado, "utf8");
  console.log("Paths atualizados com sucesso!");
}
