"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Wires the FAQ accordion (.faq-item / .faq-q) over the static markup. */
export default function FaqEnhancer() {
  const pathname = usePathname();
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".faq-item"));
    const handlers: Array<() => void> = [];
    items.forEach((item) => {
      const q = item.querySelector(".faq-q");
      if (!q) return;
      const onClick = () => {
        const open = item.classList.contains("open");
        items.forEach((i) => i.classList.remove("open"));
        if (!open) item.classList.add("open");
      };
      q.addEventListener("click", onClick);
      handlers.push(() => q.removeEventListener("click", onClick));
    });
    return () => handlers.forEach((fn) => fn());
  }, [pathname]);
  return null;
}
