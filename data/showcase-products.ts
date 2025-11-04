export type ShowcaseProduct = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  bullets: string[];
  heroImage: string;
  thumb: string;
  ctaLabel: string;
  topic: string;
};

export const showcaseProducts: ShowcaseProduct[] = [
  {
    id: "core",
    slug: "core",
    name: "Core Smart Home Controllers",
    summary: "The brain of your smart home — fast, reliable, always-on.",
    bullets: ["Runs your scenes & logic", "Instant room sync", "Local-first reliability"],
    heroImage: "/images/controller.jpg",
    thumb: "/images/controller.jpg",
    ctaLabel: "Explore Controllers",
    topic: "core"
  },
  {
    id: "controls",
    name: "Touchscreens & Controls",
    slug: "controls",
    summary: "Elegant touchscreens, remotes and keypads for effortless control.",
    bullets: ["Room-aware interfaces", "Voice & intercom ready", "Custom scenes"],
    heroImage: "/images/touch.jpg",
    thumb: "/images/touch.jpg",
    ctaLabel: "See Control Options",
    topic: "controls"
  },
  {
    id: "lighting",
    name: "Smart Lighting",
    slug: "lighting",
    summary: "Keypads, dimmers, and scenes that shape the mood of your home.",
    bullets: ["One-tap scenes", "Retrofit-friendly", "Schedules & automation"],
    heroImage: "/images/lighting.jpg",
    thumb: "/images/lighting.jpg",
    ctaLabel: "Plan Your Lighting",
    topic: "lighting"
  },
  {
    id: "audio",
    name: "Audio & Home Cinema",
    slug: "audio",
    summary: "From multiroom music to breathtaking private cinema.",
    bullets: ["Hi-fi streaming", "Dolby Atmos ready", "Room calibration"],
    heroImage: "/images/audio.jpg",
    thumb: "/images/audio.jpg",
    ctaLabel: "Design Your Sound",
    topic: "audio"
  },
  {
    id: "networking",
    name: "Networking (Pakedge)",
    slug: "networking",
    summary: "Enterprise-grade routers, switches and Wi-Fi for reliability.",
    bullets: ["Pakedge hardware", "Traffic QoS", "Remote monitoring"],
    heroImage: "/images/network.jpg",
    thumb: "/images/network.jpg",
    ctaLabel: "Stabilize Your Network",
    topic: "networking"
  },
  {
    id: "security",
    name: "Security & Intercom",
    slug: "security",
    summary: "See, talk, and secure — from the door to every room.",
    bullets: ["Door stations", "Cameras & NVR", "Secure remote access"],
    heroImage: "/images/security.jpg",
    thumb: "/images/security.jpg",
    ctaLabel: "Secure Your Home",
    topic: "security"
  },
  {
    id: "shades",
    name: "Shades & Comfort",
    slug: "shades",
    summary: "Automated shades and climate for daily comfort and efficiency.",
    bullets: ["Quiet motors", "Schedules & sensors", "Energy savings"],
    heroImage: "/images/climate.jpg",
    thumb: "/images/climate.jpg",
    ctaLabel: "Explore Comfort",
    topic: "shades"
  },
  {
    id: "av-distribution",
    name: "AV Distribution",
    slug: "av-distribution",
    summary: "Centralized 4K video and audio to every room, clutter-free.",
    bullets: ["Matrix switches", "Rack-friendly", "Single remote per room"],
    heroImage: "/images/distribution.jpg",
    thumb: "/images/distribution.jpg",
    ctaLabel: "Streamline Your AV",
    topic: "av-distribution"
  }
];