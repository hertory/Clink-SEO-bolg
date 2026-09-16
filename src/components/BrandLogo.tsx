import { brandLogo } from "@/lib/brandLogos";

type Props = {
  name: string;
  domain?: string;
  size?: number;
  className?: string;
};

/**
 * Renders a real brand mark when we have one on file, otherwise a neutral
 * monogram tile so the grid never shows a broken image.
 */
export function BrandLogo({ name, domain, size = 36, className = "" }: Props) {
  const src = brandLogo(domain);
  const box = {
    width: size,
    height: size,
    borderColor: "var(--surface-stroke)",
  } as const;

  if (!src) {
    return (
      <span
        aria-hidden
        className={`inline-flex shrink-0 items-center justify-center rounded-[10px] border bg-elev-2 text-[13px] font-semibold text-foreground-subtle ${className}`}
        style={box}
      >
        {name.replace(/[^A-Za-z0-9]/g, "").charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] border bg-white ${className}`}
      style={box}
    >
      <img
        src={src}
        alt={`${name} logo`}
        width={size}
        height={size}
        loading="lazy"
        className="h-full w-full object-contain p-1"
      />
    </span>
  );
}
