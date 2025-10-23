export type ProductItem = {
  id: string;
  slug: string;
  title_en: string;
  title_ka: string;
  img: string;
  href?: string;
  depth?: number;
};

export const products: ProductItem[] = [
  {
    id: "controllers",
    slug: "controllers",
    title_en: "Core Controllers",
    title_ka: "კონტროლერები (Core)",
    img: "/images/controllers.jpg",
    depth: 0.15,
  },
  {
    id: "climate",
    slug: "climate",
    title_en: "Climate Control",
    title_ka: "კლიმატის კონტროლი",
    img: "/images/climate.jpg",
    depth: -0.05,
  },
  {
    id: "security",
    slug: "security",
    title_en: "Security & Cameras",
    title_ka: "უსაფრთხოება და კამერები",
    img: "/images/security.jpg",
    depth: 0.1,
  },
  {
    id: "audio",
    slug: "audio",
    title_en: "Audio & Video",
    title_ka: "აუდიო და ვიდეო",
    img: "/images/audio.jpg",
    depth: -0.1,
  },
  {
    id: "lighting",
    slug: "lighting",
    title_en: "Smart Lighting",
    title_ka: "ჭკვიანი განათება",
    img: "/images/lighting.jpg",
    depth: 0.08,
  },
  {
    id: "intercom",
    slug: "intercom",
    title_en: "Intercom & Access",
    title_ka: "ინტერკომი და წვდომა",
    img: "/images/intercom.jpg",
    depth: -0.06,
  },
];