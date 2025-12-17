// lib/calculator/package-engine.ts

import {
  AREA_BRACKETS,
  PACKAGE_OFFERS,
  type AreaBracketId,
  type PackageTier,
} from "@/data/pricing-packages";

export function pickBracketId(areaSqm: number): AreaBracketId {
  const a = Math.max(0, Math.floor(areaSqm || 0));
  const bracket = AREA_BRACKETS.find((b) => a >= b.minSqm && a <= b.maxSqm);
  return bracket?.id ?? "from60";
}

export function getOffer(tier: PackageTier, areaSqm: number) {
  const bracketId = pickBracketId(areaSqm);
  const offer = PACKAGE_OFFERS[tier][bracketId];
  return { bracketId, offer };
}

// Simple recommendation based on yes/no needs.
export type Needs = {
  lighting: boolean;
  dimmableLighting: boolean;
  keypads: boolean;
  scenes: boolean;

  touchPanel: boolean;
  audioForTv: boolean;
  smartLock: boolean;
  curtainControl: boolean;
  sensorsOrVoice: boolean;
};

export function recommendTier(needs: Needs) {
  const n = normalizeNeeds(needs);

  // HARD premium triggers (premium-only experiences)
  const hardPremium =
    n.curtainControl ||
    n.sensorsOrVoice ||
    n.smartLock;

  if (hardPremium) return "premium";

  // Comfort triggers
  const comfortTriggers = n.dimmableLighting || n.touchPanel || n.scenes;

  if (comfortTriggers) return "comfort";

  return "essential";
}

export function formatUsd(amount: number) {
  const n = Math.max(0, Math.round(amount || 0));
  return `$${n.toLocaleString("en-US")}`;
}

export function normalizeNeeds(n: Needs): Needs {
  const next = { ...n };

  // dimming implies lighting control exists
  if (next.dimmableLighting) next.lighting = true;

  if (next.scenes && !next.keypads && !next.touchPanel) next.keypads = true;

  return next;
}