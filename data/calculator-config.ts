import type { QualityTier, LightingLevel, AudioLevel, ClimateLevel, SecurityLevel, NetworkLevel } from "@/lib/calculator/types";

export type CatalogueItem = {
  id: string;
  label: string;
  unitCost: number; // GEL – TODO: Dont forget to Replace with real prices
};

type PricingConfig = {
  controllers: Record<"core1" | "core3" | "core5", CatalogueItem>;
  lighting: {
    dimmer: CatalogueItem;
    keypad: CatalogueItem;
    touchscreen: CatalogueItem;
  };
  audio: {
    zoneAmp: CatalogueItem;
  };
  security: {
    camera: CatalogueItem;
  };
  network: {
    accessPoint: CatalogueItem;
    router: CatalogueItem;
    switchPoE: CatalogueItem;
  };
  misc: {
    rack: CatalogueItem;
    ups: CatalogueItem;
  };
  labor: {
    installPerDevice: number;
    baseProgrammingHours: Record<QualityTier, number>;
    programmingPerHour: number;
    renovationMultiplier: number;
  };
  margin: {
    min: number;
    max: number;
  };
};

type RuleConfig = {
  lighting: {
    baseLoadsPer100Sqm: number;
    levelMultipliers: Record<LightingLevel, number>;
    keypadPerMainRoom: number;
  };
  audio: {
    zonesByLevel: Record<AudioLevel, (rooms: { livingAreas: number; bedrooms: number }) => number>;
    ampsPerZones: number;
  };
  climate: {
    extraPerZoneLevel: Record<ClimateLevel, number>;
  };
  security: {
    camerasPer100Sqm: number;
    levelMultipliers: Record<SecurityLevel, number>;
  };
  network: {
    sqmPerAp: number;
    levelMultipliers: Record<NetworkLevel, number>;
  };
};

export type CalculatorConfig = {
  pricing: PricingConfig;
  rules: RuleConfig;
};

export const CALCULATOR_CONFIG: CalculatorConfig = {
  pricing: {
    controllers: {
      core1: { id: "core1", label: "Control4 Core 1", unitCost: 1500 },
      core3: { id: "core3", label: "Control4 Core 3", unitCost: 3000 },
      core5: { id: "core5", label: "Control4 Core 5", unitCost: 5000 },
    },
    lighting: {
      dimmer: { id: "dimmer", label: "Smart Dimmer Module", unitCost: 250 },
      keypad: { id: "keypad", label: "Keypad", unitCost: 350 },
      touchscreen: { id: "touchscreen", label: "Wall Touchscreen", unitCost: 1200 },
    },
    audio: {
      zoneAmp: { id: "zoneAmp", label: "Audio Zone Amplifier", unitCost: 900 },
    },
    security: {
      camera: { id: "camera", label: "IP Camera", unitCost: 500 },
    },
    network: {
      accessPoint: { id: "ap", label: "Wi-Fi Access Point", unitCost: 400 },
      router: { id: "router", label: "Router", unitCost: 600 },
      switchPoE: { id: "switchPoE", label: "PoE Switch", unitCost: 800 },
    },
    misc: {
      rack: { id: "rack", label: "Equipment Rack", unitCost: 900 },
      ups: { id: "ups", label: "UPS", unitCost: 600 },
    },
    labor: {
      installPerDevice: 60,
      baseProgrammingHours: {
        essential: 10,
        comfort: 20,
        premium: 35,
      },
      programmingPerHour: 120,
      renovationMultiplier: 1.25,
    },
    margin: {
      min: 0.1,
      max: 0.25,
    },
  },

  rules: {
    lighting: {
      baseLoadsPer100Sqm: 12,
      levelMultipliers: {
        none: 0,
        basic: 0.7,
        scenes: 1,
        full: 1.3,
      },
      keypadPerMainRoom: 1,
    },
    audio: {
      zonesByLevel: {
        none: () => 0,
        living: ({ livingAreas }) => Math.max(1, livingAreas),
        multiroom: ({ livingAreas, bedrooms }) =>
          Math.max(2, livingAreas + Math.min(2, bedrooms)),
        wholeHome: ({ livingAreas, bedrooms }) =>
          Math.max(3, livingAreas + bedrooms),
      },
      ampsPerZones: 4,
    },
    climate: {
      extraPerZoneLevel: {
        none: 0,
        basic: 2,
        zones: 4,
      },
    },
    security: {
      camerasPer100Sqm: 2,
      levelMultipliers: {
        none: 0,
        basic: 0.8,
        full: 1.3,
      },
    },
    network: {
      sqmPerAp: 80,
      levelMultipliers: {
        none: 0,
        basic: 1,
        pro: 1.4,
      },
    },
  },
};
