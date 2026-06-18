import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pagehead">
      <div className="wrap" style={{ textAlign: "center" }}>
        <span className="eyebrow">
          <i />
          404
        </span>
        <h1 className="ph-title">Page not found</h1>
        <p className="ph-sub">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="hero-cta" style={{ justifyContent: "center", marginTop: 24 }}>
          <Link href="/" className="btn-primary">
            Back home
          </Link>
          <Link href="/services" className="btn-ghost">
            Browse services
          </Link>
        </div>
      </div>
    </section>
  );
}
