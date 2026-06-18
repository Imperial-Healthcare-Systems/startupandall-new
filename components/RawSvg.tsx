/**
 * Renders raw inline SVG/HTML markup. Used for the many decorative icons that
 * ship as SVG strings in the data layer (catalogue/service icons) and for the
 * static icon set ported from the original build.
 */
export default function RawSvg({
  html,
  className,
  ariaHidden = true,
}: {
  html: string;
  className?: string;
  ariaHidden?: boolean;
}) {
  return (
    <span
      className={className}
      aria-hidden={ariaHidden}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
