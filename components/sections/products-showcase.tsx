import Image from "next/image";
import { ChevronRight } from "lucide-react";

type Item = {
  id: string;
  title: string;
  subtitle: string;
  image: string; // public/… path
  featured?: boolean;
};

const items: Item[] = [
  { id:"core", title:"Core Controllers", subtitle:"The brain of your home.", image:"/images/products/core.jpg", featured:true },
  { id:"security", title:"Security & Cameras", subtitle:"See and secure, anywhere.", image:"/images/products/security.jpg" },
  { id:"av", title:"Audio & Video", subtitle:"Whole-home AV zones.", image:"/images/products/av.jpg" },
  { id:"lighting", title:"Smart Lighting", subtitle:"Dimmers, keypads, scenes.", image:"/images/products/lighting.jpg" },
  { id:"intercom", title:"Intercom & Access", subtitle:"Doors, gates, rooms.", image:"/images/products/intercom.jpg" },
  { id:"climate", title:"Climate Control", subtitle:"Comfort, schedules, sensors.", image:"/images/products/climate.jpg" },
];

export default function ProductsShowcase() {
  const featured = items.find(i => i.featured);
  const rest = items.filter(i => !i.featured);

  return (
    <section aria-labelledby="products-heading" className="text-white">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-wide text-white/60">Products</p>
        <h2 id="products-heading" className="text-3xl md:text-4xl font-semibold">
          Control4 — <span className="text-[#00C2FF]">Premium Smart Home</span> Line
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          A curated look at the core of the Control4 ecosystem. Explore categories and see how they work together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Featured */}
        {featured && (
          <Card item={featured} className="md:col-span-2 h-72 md:h-[22rem]" />
        )}

        {/* Rest */}
        {rest.map((i) => (
          <Card key={i.id} item={i} className="h-56" />
        ))}
      </div>
    </section>
  );
}

function Card({ item, className = "" }: { item: Item; className?: string }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-3xl bg-white/3 ring-1 ring-white/10 ${className}`}
    >
      {/* image */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover opacity-80 transition group-hover:opacity-100"
        priority={item.featured}
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      {/* copy */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <div className="max-w-[85%]">
          <h3 className="text-lg md:text-xl font-semibold drop-shadow">{item.title}</h3>
          <p className="text-sm text-white/85">{item.subtitle}</p>
        </div>

        <button
          className="mt-4 inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-4 py-2 text-sm
                     ring-1 ring-white/15 backdrop-blur hover:bg-white/15 transition"
        >
          See in action <ChevronRight size={16}/>
        </button>
      </div>

      {/* edge light on hover */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                   [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]
                   bg-gradient-to-r from-[#0056B8]/0 via-[#00C2FF]/40 to-[#0056B8]/0"
      />
    </article>
  );
}