import sharp from 'sharp';

// Preserve the exact artwork currently used by the site. Conventional pixel
// interpolation only: no generative reconstruction, recoloring, or new details.
const source = 'public/figma/redesign/hero-bridge-enhanced.webp';
for (const width of [1280, 2003, 4006]) {
  const image = sharp(source).resize({ width, kernel: 'lanczos3' });
  await image.clone().avif({ quality: 85, effort: 6, chromaSubsampling: '4:4:4' })
    .toFile(`public/figma/redesign/hero-bridge-exact-${width}.avif`);
  await image.clone().webp({ quality: 95, effort: 6 })
    .toFile(`public/figma/redesign/hero-bridge-exact-${width}.webp`);
}
