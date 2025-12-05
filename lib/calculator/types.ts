// lib/calculator/types.ts

export type PropertyType = "apartment" | "house" | "villa";
export type QualityTier = "essential" | "comfort" | "premium";

export type LightingLevel = "none" | "basic" | "scenes" | "full";
export type AudioLevel = "none" | "living" | "multiroom" | "wholeHome";
export type ClimateLevel = "none" | "basic" | "zones";
export type SecurityLevel = "none" | "basic" | "full";
export type NetworkLevel = "none" | "basic" | "pro";

export type ExperienceSelection = {
  lighting: LightingLevel;
  audio: AudioLevel;
  climate: ClimateLevel;
  security: SecurityLevel;
  network: NetworkLevel;
};

export type CalculatorInput = {
  propertyType: PropertyType;
  areaSqm: number;
  floors: number;
  bedrooms: number;
  bathrooms: number;
  livingAreas: number;
  isRenovation: boolean;
  qualityTier: QualityTier;
  experiences: ExperienceSelection;
};

export type EstimateBreakdown = {
  lighting: number;
  audio: number;
  climate: number;
  security: number;
  network: number;
  labor: number;
};

export type DeviceCounts = {
  controllers: number;
  dimmers: number;
  keypads: number;
  touchscreens: number;
  audioZones: number;
  amps: number;
  cameras: number;
  apCount: number;
  miscDevices: number;
};

export type EstimateResult = {
  input: CalculatorInput;
  breakdown: EstimateBreakdown;
  subtotal: number;
  minTotal: number;
  maxTotal: number;
  recommendedControllerId: "core1" | "core3" | "core5";
  deviceCounts: DeviceCounts;
};
