import Image from "next/image";
import { DeviceArt } from "@/components/art/DeviceArt";
import type { DeviceArtVariant, Product } from "@/lib/data/catalog";

/**
 * Single entry point for product imagery.
 *
 * Real photography wins when `product.image` exists; otherwise the vector
 * placeholder renders. Both paths produce the same aspect ratio and the same
 * accessible description policy, so swapping in store photos changes nothing
 * structurally.
 */
export function ProductImage({
  product,
  variant = "front",
  className,
  sizes = "(min-width: 1280px) 34vw, (min-width: 768px) 45vw, 80vw",
  priority,
}: {
  product: Product;
  variant?: "front" | "back";
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (product.image) {
    return (
      <Image
        src={product.image.src}
        alt={product.image.alt}
        width={900}
        height={1800}
        sizes={sizes}
        priority={priority}
        className={className ? `${className} object-cover` : "object-cover"}
      />
    );
  }

  return (
    <DeviceArt
      variant={product.art satisfies DeviceArtVariant}
      side={variant}
      className={className}
    />
  );
}
