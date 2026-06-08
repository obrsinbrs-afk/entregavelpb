import https from "https";
import fs from "fs";
import path from "path";

const IMAGENS = [
  { url: "https://v3b.fal.media/files/b/0a9d67e3/7Vb9eYB6H7w6G99023Xac.jpg", nome: "pan-de-cebada-de-elias.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d67e3/3mtvlzkDDhWHztm3Q9ryb.jpg", nome: "sopa-de-lentejas-de-esau.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d67e3/92Fx7cPkHdslp61VmiGA2.jpg", nome: "pescado-a-la-plancha-de-tiberias.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d67e3/DI8Yh5wrqNRqxto4lmbIJ.jpg", nome: "ensalada-de-higos-de-abraham.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d67e3/PG_0C9xb5hkwe7Xb_la-X.jpg", nome: "pure-de-garbanzo-de-daniel.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d67e8/BK7LpLwq0yhWpGm0EyRIB.jpg", nome: "pollo-con-hierbas-de-salomon.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d67e3/qP8y-utWIvQRAIm75QDCS.jpg", nome: "caldo-verde-biblico.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d67e3/k_qC84KuvJy5Z5oKgr_ga.jpg", nome: "datiles-rellenos-con-nueces.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d67e8/zAgG6MB--3E4ZmZ2_5JdZ.jpg", nome: "guiso-de-pescado-del-mar-de-galilea.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d67e3/nTqDt9o-p_BQQmI_UEoEY.jpg", nome: "pasta-de-aceitunas-con-hierbas.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d67e3/sxsgt6ackddT1vcEKgqsX.jpg", nome: "huevos-pochados-con-aceite-y-hierbas.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d67e8/LkD5dAyV8McKRTJfAK2vU.jpg", nome: "sopa-de-calabaza-con-jengibre.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d67e8/X8snGwVQvlQCgD6KySPcA.jpg", nome: "ensalada-de-pepino-y-poro.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d67e4/Ja0jzAywc1BEicgYL2jzh.jpg", nome: "atole-de-cebada-con-miel.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d67e3/Tn0n0_swOs-L1kWE0EcZo.jpg", nome: "caldo-de-verduras-de-la-tierra-prometida.jpg" },
  { url: "https://v3b.fal.media/files/b/0a9d6826/ldX-ZvMFlJT5A0CZPgmcO.jpg", nome: "banner-videos.jpg" },
];

const PASTA = path.resolve("public/images");
if (!fs.existsSync(PASTA)) fs.mkdirSync(PASTA, { recursive: true });

function baixar(url, destino) {
  return new Promise((resolve, reject) => {
    const arquivo = fs.createWriteStream(destino);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        arquivo.close();
        fs.unlinkSync(destino);
        return baixar(res.headers.location, destino).then(resolve).catch(reject);
      }
      res.pipe(arquivo);
      arquivo.on("finish", () => { arquivo.close(); resolve(); });
    }).on("error", (e) => { fs.unlinkSync(destino); reject(e); });
  });
}

async function main() {
  for (const img of IMAGENS) {
    const destino = path.join(PASTA, img.nome);
    process.stdout.write(`Baixando ${img.nome}... `);
    await baixar(img.url, destino);
    const kb = Math.round(fs.statSync(destino).size / 1024);
    console.log(`OK (${kb}kb)`);
  }
  console.log("\nTodas as imagens baixadas!");
}

main();
