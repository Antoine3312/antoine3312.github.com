// scripts/generateImagesData.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sizeOf from 'image-size';
import sharp from 'sharp';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const imagesDir = path.join(dirname, '../public/');
const outputFile = path.join(dirname, '../src/imageData.json');

const imageFiles = fs
  .readdirSync(imagesDir)
  .filter(file => /\.(png|jpe?g|webp|svg)$/i.test(file)); // on exclut SVG pour le blur

const imageData = await Promise.all(
  imageFiles.map(async file => {
    const filePath = path.join(imagesDir, file);

    // Dimensions
    const buffer = fs.readFileSync(filePath);
    const dimensions = sizeOf(buffer);

    // Placeholder base64 (image très petite, genre 10px)
    const placeholderBuffer = await sharp(filePath)
      .resize(100) // redimensionne à 10px de large, conserve le ratio
      .toBuffer();
    const base64 = `data:image/${file.split('.').pop()};base64,${placeholderBuffer.toString('base64')}`;

    return {
      src: `${file}`,
      width: dimensions.width,
      height: dimensions.height,
      placeholder: base64, // 🔥 on stocke le blur
    };
  }),
);

fs.writeFileSync(outputFile, JSON.stringify(imageData, null, 2));
console.log('✅ imageData.json generated');
