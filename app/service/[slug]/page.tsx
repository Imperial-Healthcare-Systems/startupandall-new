import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_DATA, SERVICE_SLUGS } from "@/lib/service-data";
import ServiceDetail from "@/components/ServiceDetail";

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = SERVICE_DATA[slug];
  if (!d) return { title: "Service — Startup And All" };
  return {
    title: `${d.name} — ${d.price} | Startup And All`,
    description: d.tagline,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICE_DATA[slug];
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
