"use client";

import { useMemo, useState } from "react";
import Container from "@/components/common/container";
import { estimateProject } from "@/lib/calculator/estimate";
import type {
  CalculatorInput,
  ExperienceSelection,
  PropertyType,
  QualityTier,
} from "@/lib/calculator/types";

const defaultExperiences: ExperienceSelection = {
  lighting: "scenes",
  audio: "living",
  climate: "basic",
  security: "basic",
  network: "basic",
};

const defaultInput: CalculatorInput = {
  propertyType: "apartment",
  areaSqm: 80,
  floors: 1,
  bedrooms: 2,
  bathrooms: 1,
  livingAreas: 1,
  isRenovation: false,
  qualityTier: "comfort",
  experiences: defaultExperiences,
};

function formatCurrency(amount: number) {
  const formatted = amount.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
  return `${formatted} ₾`;
}

export default function CalculatorPage() {
  const [form, setForm] = useState<CalculatorInput>(defaultInput);

  const result = useMemo(() => estimateProject(form), [form]);

  const handleNumberChange = (field: keyof CalculatorInput) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value || 0);
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleCheckboxChange = (field: keyof CalculatorInput) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.checked }));
    };

  const handlePropertyTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
    ) => {
    const value = e.target.value as PropertyType;
    setForm((prev) => ({ ...prev, propertyType: value }));
    };

  const handleExperienceChange =
    <K extends keyof ExperienceSelection>(field: K) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value as ExperienceSelection[K];
      setForm((prev) => ({
        ...prev,
        experiences: {
          ...prev.experiences,
          [field]: value,
        },
      }));
    };

  return (
    <main className="min-h-screen bg-bg text-ink pb-16">
      <Container className="pt-24 lg:pt-28">
        {/* Header */}
        <section className="mb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-white/60">
            CALCULATOR · გამოთვლა
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
            Smart Home Price Calculator
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/70">
            Estimate the budget for your Control4 smart home in Georgia. Select
            your home size, rooms and the experiences you want – lighting,
            audio, climate, security and more. This is an approximate project
            budget, not a final commercial offer.
          </p>
        </section>

        {/* Grid */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
          {/* LEFT – FORM */}
          <div className="space-y-8 rounded-2xl bg-surface/70 border border-white/5 p-5 sm:p-6 lg:p-7 backdrop-blur-md">
            {/* Property basics */}
            <div>
              <h2 className="text-sm font-semibold text-white mb-3">
                1. Your Home · თქვენი სახლი
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Property type */}
                <div>
                  <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                    Property type / ობიექტის ტიპი
                  </label>
                  <select
                    value={form.propertyType}
                    onChange={handlePropertyTypeChange}
                    className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary/70"
                    >
                    <option value="apartment">Apartment / ბინა</option>
                    <option value="house">House / სახლი</option>
                    <option value="villa">Villa / ვილა</option>
                   </select>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                    Area (m²) / ფართობი (მ²)
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={1000}
                    value={form.areaSqm}
                    onChange={handleNumberChange("areaSqm")}
                    className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary/70"
                  />
                </div>

                {/* Floors */}
                <div>
                  <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                    Floors / სართულები
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={form.floors}
                    onChange={handleNumberChange("floors")}
                    className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary/70"
                  />
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                    Bedrooms / საძინებლები
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={form.bedrooms}
                    onChange={handleNumberChange("bedrooms")}
                    className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary/70"
                  />
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                    Bathrooms / სველი წერტილები
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={form.bathrooms}
                    onChange={handleNumberChange("bathrooms")}
                    className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary/70"
                  />
                </div>

                {/* Living areas */}
                <div>
                  <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
                    Living areas / მისაღები ზონები
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={form.livingAreas}
                    onChange={handleNumberChange("livingAreas")}
                    className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary/70"
                  />
                </div>

                {/* Renovation */}
                <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                  <input
                    id="isRenovation"
                    type="checkbox"
                    checked={form.isRenovation}
                    onChange={handleCheckboxChange("isRenovation")}
                    className="h-4 w-4 rounded border-white/20 bg-black/40 text-primary focus:ring-primary/70"
                  />
                  <label
                    htmlFor="isRenovation"
                    className="text-xs sm:text-sm text-white/70"
                  >
                    This is a renovation / რემონტირებული ობიექტი (კაბელები უკვე არიან)
                  </label>
                </div>
              </div>
            </div>

            {/* Quality */}
            <div>
              <h2 className="text-sm font-semibold text-white mb-3">
                2. System level · სისტემის დონე
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {(["essential", "comfort", "premium"] as QualityTier[]).map(
                  (tier) => {
                    const isActive = form.qualityTier === tier;
                    const labelMap: Record<QualityTier, string> = {
                      essential: "Essential / საბაზისო",
                      comfort: "Comfort / კომფორტი",
                      premium: "Premium / პრემიუმ",
                    };
                    const descMap: Record<QualityTier, string> = {
                      essential: "Main rooms only",
                      comfort: "Most key areas",
                      premium: "Full-home experience",
                    };
                    return (
                      <button
                        key={tier}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, qualityTier: tier }))
                        }
                        className={[
                          "rounded-xl border px-3 py-2.5 text-left text-xs sm:text-sm transition",
                          "bg-black/40 hover:bg-black/60",
                          isActive
                            ? "border-primary/80 shadow-lg shadow-primary/20"
                            : "border-white/10",
                        ].join(" ")}
                      >
                        <div className="font-medium text-white">
                          {labelMap[tier]}
                        </div>
                        <div className="text-[11px] text-white/60 mt-0.5">
                          {descMap[tier]}
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Experiences */}
            <div>
              <h2 className="text-sm font-semibold text-white mb-3">
                3. Experiences · რა გსურთ აკონტროლოთ
              </h2>
              <div className="space-y-3">
                {/* Lighting */}
                <ExperienceSelect
                  label="Lighting / განათება"
                  value={form.experiences.lighting}
                  onChange={handleExperienceChange("lighting")}
                  options={[
                    { value: "none", label: "None / არა" },
                    { value: "basic", label: "Basic on/off" },
                    { value: "scenes", label: "Scenes in main rooms" },
                    { value: "full", label: "Full-home lighting scenes" },
                  ]}
                />
                {/* Audio */}
                <ExperienceSelect
                  label="Audio / მუსიკა"
                  value={form.experiences.audio}
                  onChange={handleExperienceChange("audio")}
                  options={[
                    { value: "none", label: "None / არა" },
                    { value: "living", label: "Living room only" },
                    {
                      value: "multiroom",
                      label: "2–4 main zones (living + kitchen + master)",
                    },
                    { value: "wholeHome", label: "Whole home audio" },
                  ]}
                />
                {/* Climate */}
                <ExperienceSelect
                  label="Climate / კლიმატი"
                  value={form.experiences.climate}
                  onChange={handleExperienceChange("climate")}
                  options={[
                    { value: "none", label: "None / არა" },
                    { value: "basic", label: "Basic integration" },
                    {
                      value: "zones",
                      label: "Multi-zone climate control",
                    },
                  ]}
                />
                {/* Security */}
                <ExperienceSelect
                  label="Security & Cameras / უსაფრთხოება"
                  value={form.experiences.security}
                  onChange={handleExperienceChange("security")}
                  options={[
                    { value: "none", label: "None / არა" },
                    { value: "basic", label: "Few cameras + basic integration" },
                    {
                      value: "full",
                      label: "Full perimeter & key areas",
                    },
                  ]}
                />
                {/* Network */}
                <ExperienceSelect
                  label="Network & Wi-Fi / ქსელი"
                  value={form.experiences.network}
                  onChange={handleExperienceChange("network")}
                  options={[
                    { value: "none", label: "Existing only" },
                    { value: "basic", label: "Stable Wi-Fi for home" },
                    {
                      value: "pro",
                      label: "Pro-grade Wi-Fi for work, cameras, streaming",
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* RIGHT – SUMMARY */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-primary/40 bg-linear-to-b from-primary/20 via-surface/90 to-black/80 p-5 sm:p-6 shadow-[0_0_40px_rgba(0,86,184,0.45)]">
              <p className="text-xs uppercase tracking-[0.22em] text-primary/40 mb-2">
                ESTIMATE · პირველადი ბიუჯეტი
              </p>
              <h2 className="text-sm font-semibold text-white mb-4">
                Estimated project range · სავარაუდო ბიუჯეტი
              </h2>

              <div className="mb-4">
                <div className="text-2xl sm:text-3xl font-semibold text-white">
                  {formatCurrency(result.minTotal)} – {" "}
                  {formatCurrency(result.maxTotal)}
                </div>
                <p className="text-xs sm:text-sm text-white/60 mt-1">
                  Includes Control4 controller, keypads, dimmers, networking,
                  installation and programming. Exact offer is prepared after
                  on-site survey.
                </p>
              </div>

              {/* Quick chips */}
              <div className="flex flex-wrap gap-2 mb-4 text-[11px]">
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-white/70">
                  {form.areaSqm} m² · {form.bedrooms} BR · {form.floors} fl.
                </span>
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-white/70">
                  Controller: {result.recommendedControllerId.toUpperCase()}
                </span>
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-white/70">
                  Dimmers: {result.deviceCounts.dimmers} · Keypads:{" "}
                  {result.deviceCounts.keypads}
                </span>
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs sm:text-sm">
                {(
                  [
                    ["Lighting", "lighting"],
                    ["Audio", "audio"],
                    ["Climate", "climate"],
                    ["Security", "security"],
                    ["Network", "network"],
                    ["Labor", "labor"],
                  ] as const
                ).map(([label, key]) => {
                  const value = result.breakdown[key];
                  const share =
                    result.subtotal > 0 ? value / result.subtotal : 0;
                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">{label}</span>
                        <span className="text-white/90">
                          {formatCurrency(value)}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-primary to-accent"
                          style={{ width: `${Math.max(8, share * 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 text-[11px] text-white/50">
                This calculator gives an approximate budget. Final pricing
                depends on exact device models, wiring, construction phase and
                detailed design.
              </p>
            </div>

            {/* Placeholder for next step – lead form (we add later) */}
            <div className="rounded-2xl border border-white/10 bg-surface/80 p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-white mb-2">
                Next step · შემდეგი ნაბიჯი
              </h3>
              <p className="text-xs sm:text-sm text-white/65">
                In the next stage we will add a short contact form here so the
                client can send this estimate directly to your email / WhatsApp.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-white/55 list-disc list-inside">
                <li>Change inputs and watch estimate update live</li>
                <li>Test different quality levels and experiences</li>
                <li>Verify that the ranges feel realistic with Mamuka</li>
              </ul>
            </div>
          </aside>
        </section>
      </Container>
    </main>
  );
}

type ExperienceOption = {
  value: string;
  label: string;
};

type ExperienceSelectProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: ExperienceOption[];
};

function ExperienceSelect({
  label,
  value,
  onChange,
  options,
}: ExperienceSelectProps) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wide text-white/50 mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary/70"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}