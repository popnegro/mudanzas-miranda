const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// --- Configuración ---
const SOURCE_DIR = path.join(__dirname, 'img/originales'); // Carpeta con imágenes originales
const OUTPUT_DIR = path.join(__dirname, 'img');           // Carpeta de destino para imágenes procesadas
const WIDTHS = [1200, 800, 600, 400];                         // Anchos a generar (en píxeles)
const QUALITY = {
  jpeg: 80, // Calidad para JPGs
  webp: 75  // Calidad para WebPs
};
// -------------------

// Asegurarse de que el directorio de origen exista
if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`❌ El directorio de origen no existe: ${SOURCE_DIR}`);
  console.log('Creá una carpeta "originales" dentro de "img" y colocá tus imágenes de alta resolución allí.');
  process.exit(1); // eslint-disable-line no-process-exit
}

const processImage = async (filePath) => {
  const { name: imgName, ext } = path.parse(filePath);
  
  if (!['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) {
    console.log(`⏭️  Omitiendo archivo no soportado: ${path.basename(filePath)}`);
    return;
  }

  console.log(`\nProcessing ${imgName}${ext}...`);

  // eslint-disable-next-line no-restricted-syntax
  for (const width of WIDTHS) {
    const outputFileNameWebP = `${imgName}-${width}.webp`;
    const outputFileNameJPG = `${imgName}-${width}.jpg`;

    const imageProcessor = sharp(filePath).resize(width);

    // Generar WebP
    await imageProcessor
      .webp({ quality: QUALITY.webp })
      .toFile(path.join(OUTPUT_DIR, outputFileNameWebP));
    console.log(`✅ Generado: ${outputFileNameWebP}`);

    // Generar JPG
    await imageProcessor
      .jpeg({ quality: QUALITY.jpeg, progressive: true, mozjpeg: true })
      .toFile(path.join(OUTPUT_DIR, outputFileNameJPG));
    console.log(`✅ Generado: ${outputFileNameJPG}`);
  }
};

const main = async () => {
  console.log('--- Iniciando procesamiento de imágenes ---');
  const files = fs.readdirSync(SOURCE_DIR);
  const processingPromises = files.map((file) => processImage(path.join(SOURCE_DIR, file)));
  await Promise.all(processingPromises);
  console.log('\n--- ✨ Todas las imágenes han sido procesadas. ---');
};

main().catch(console.error);