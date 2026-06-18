export interface Service {
  name: string;
  slug: string;
  category: string;
  tagline: string;
  price: string;
  timeline: string;
  govt: string;
  what: string;
  benefits: string[];
  docs: string[];
  steps: [string, string][];
  detailed?: boolean;
}

export interface CatalogueCategory {
  category: string;
  icon: string;
  services: { name: string; slug: string }[];
}
