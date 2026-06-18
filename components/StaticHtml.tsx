/**
 * Renders a block of ported marketing HTML. Internal links inside have already
 * been rewritten to real routes at build time. Server component.
 */
export default function StaticHtml({ html, className }: { html: string; className?: string }) {
  if (!html) return null;
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
