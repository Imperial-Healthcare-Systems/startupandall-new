import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DisclaimerTicker from "@/components/DisclaimerTicker";
import FloatingActions from "@/components/FloatingActions";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Startup And All — Start, protect & run your business",
  description:
    "Company registration, GST, trademarks and compliance in India — handled by one dedicated advisor with clear, upfront pricing. 150+ services under one roof.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <div id="scrollbar" />
        <Header />
        <main id="app">{children}</main>
        <DisclaimerTicker />
        <Footer />
        <FloatingActions />
        {/* Client-side global behaviors: scroll progress, header-scroll state,
            reveal-on-scroll, parallax — ported from the original build. */}
        <SiteChrome />
      </body>
    </html>
  );
}
