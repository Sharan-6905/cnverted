import { productCanvasAssets } from "./product-canvas-assets";

export type ProductIconName = keyof typeof productCanvasAssets;

/** Keep the exported SVG's dimensions intact; scale its surrounding presentation. */
export function ProductIcon({
  name,
  size = 20,
}: {
  name: ProductIconName;
  size?: number;
}) {
  const asset = productCanvasAssets[name];
  const width = "width" in asset ? asset.width : size;
  const height = "height" in asset ? asset.height : size;
  const scale = Math.min(size / width, size / height);
  return (
    <span
      className="product-icon"
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <img
        src={asset.src}
        width={width}
        height={height}
        alt=""
        draggable={false}
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      />
    </span>
  );
}
