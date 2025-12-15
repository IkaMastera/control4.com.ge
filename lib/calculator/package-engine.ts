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
  dimmableLighting: boolean;
  touchPanel: boolean;
  audioForTv: boolean;
  smartLock: boolean;
  curtainControl: boolean;
  sensorsOrVoice: boolean;
};

export function recommendTier(needs: Needs): PackageTier {
  // Premium triggers: lock/curtains/sensors/audio
  if (
    needs.smartLock ||
    needs.curtainControl ||
    needs.sensorsOrVoice ||
    needs.audioForTv
  ) {
    return "premium";
  }

  // Comfort triggers: dimmable lighting or touch panel
  if (needs.dimmableLighting || needs.touchPanel) {
    return "comfort";
  }

  // Otherwise essential
  return "essential";
}

export function formatUsd(amount: number) {
  const n = Math.max(0, Math.round(amount || 0));
  return `$${n.toLocaleString("en-US")}`;
}