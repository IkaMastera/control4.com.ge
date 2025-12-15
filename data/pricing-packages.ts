// data/pricing-packages.ts

export type PackageTier = "essential" | "comfort" | "premium";

export type AreaBracketId = "upTo35" | "upTo50" | "from60";

export type AreaBracket = {
  id: AreaBracketId;
  label: string;
  // inclusive boundaries for selection rules
  minSqm: number;
  maxSqm: number; // use Infinity for open ended
};

export const AREA_BRACKETS: AreaBracket[] = [
  { id: "upTo35", label: "Up to 35 m²", minSqm: 0, maxSqm: 35 },
  { id: "upTo50", label: "Up to 50 m²", minSqm: 36, maxSqm: 50 },
  { id: "from60", label: "60 m² and above", minSqm: 51, maxSqm: Infinity }, // maps 51+ into “60+” bucket per Tamta
];

export type PackageOffer = {
  usdBudget: number;
  included: string[];
};

export const PACKAGE_OFFERS: Record<
  PackageTier,
  Record<AreaBracketId, PackageOffer>
> = {
  essential: {
    upTo35: {
      usdBudget: 5000,
      included: [
        "Control4 Core Lite Controller",
        "Bus Gateway & Bus Power Supply",
        "Lighting (non-dimmable): up to 6 lighting points",
        "Engraved keypads",
        "DIN-rail 8-channel relay module",
        "HVAC control: 1 zone",
        "Security: Video doorbell with Neeo remote",
        "Control4 mobile app (iOS & Android)",
        "Installation, configuration & programming",
      ],
    },
    upTo50: {
      usdBudget: 6000,
      included: [
        "Control4 Core Lite Controller",
        "Bus Gateway & Bus Power Supply",
        "Lighting (non-dimmable): up to 8 lighting points",
        "Engraved keypads",
        "DIN-rail 8-channel relay module (1 pc)",
        "HVAC control: 2 zones",
        "Security: Video doorbell with Neeo remote",
        "Control4 mobile app",
        "Installation, configuration & programming",
      ],
    },
    from60: {
      usdBudget: 7300,
      included: [
        "Control4 Core Lite Controller",
        "Bus Gateway & Bus Power Supply",
        "Lighting (non-dimmable): up to 12 lighting points",
        "Engraved keypads",
        "DIN-rail 8-channel relay modules (2 pcs)",
        "HVAC control: 3 zones",
        "Security: Video doorbell with Neeo remote",
        "Control4 mobile app",
        "Installation, configuration & programming",
      ],
    },
  },

  comfort: {
    upTo35: {
      usdBudget: 7300,
      included: [
        "Control4 Core Lite Controller",
        "Bus Gateway & Bus Power Supply",
        "Lighting (dimmable): up to 6 lighting points",
        "Engraved keypads",
        "DIN-rail 8-channel Adaptive Phase Dimmer V2",
        "HVAC control: 1 zone",
        "Security: Video doorbell with Neeo remote",
        "Wall or tabletop touch panel",
        "Control4 mobile app",
        "Installation, configuration & programming",
      ],
    },
    upTo50: {
      usdBudget: 8300,
      included: [
        "Control4 Core Lite Controller",
        "Bus Gateway & Bus Power Supply",
        "Lighting (dimmable): up to 8 lighting points",
        "Engraved keypads",
        "DIN-rail 8-channel Adaptive Phase Dimmer V2",
        "HVAC control: 2 zones",
        "Security: Video doorbell with Neeo remote",
        "Touch panel",
        "Control4 mobile app",
        "Installation, configuration & programming",
      ],
    },
    from60: {
      usdBudget: 10000,
      included: [
        "Control4 Core Lite Controller",
        "Bus Gateway & Bus Power Supply",
        "Lighting (dimmable): up to 12 lighting points",
        "Engraved keypads",
        "DIN-rail 8-channel Adaptive Phase Dimmers (2 pcs)",
        "HVAC control: 3 zones",
        "Security: Video doorbell with Neeo remote",
        "Touch panel",
        "Control4 mobile app",
        "Installation, configuration & programming",
      ],
    },
  },

  premium: {
    upTo35: {
      usdBudget: 10000,
      included: [
        "Control4 Core Lite Controller",
        "Bus Gateway & Bus Power Supply",
        "Lighting (dimmable): up to 6 lighting points",
        "Engraved keypads",
        "DIN-rail 8-channel Adaptive Phase Dimmer V2",
        "HVAC control: 1 zone",
        "Security: Video doorbell with Neeo remote",
        "Control4 T4 Series 10” Tabletop Touchscreen (Black)",
        "Smart door lock integration",
        "Audio: Speakers or soundbar for 1 TV",
        "Curtain control",
        "Occupancy sensor & voice assistant integration",
        "Control4 mobile app",
        "Installation, configuration & programming",
      ],
    },
    upTo50: {
      usdBudget: 11000,
      included: [
        "Control4 Core Lite Controller",
        "Bus Gateway & Bus Power Supply",
        "Lighting (dimmable): up to 8 lighting points",
        "Engraved keypads",
        "DIN-rail 8-channel Adaptive Phase Dimmer V2",
        "HVAC control: 2 zones",
        "Security: Video doorbell with Neeo remote",
        "Control4 T4 Series 10” Tabletop Touchscreen (Black)",
        "Smart door lock integration",
        "Audio: Speakers or soundbar for 1 TV",
        "Curtain control",
        "Occupancy sensor & voice assistant integration",
        "Control4 mobile app",
        "Installation, configuration & programming",
      ],
    },
    from60: {
      usdBudget: 13000,
      included: [
        "Control4 Core 1 Controller",
        "Bus Gateway & Bus Power Supply",
        "Lighting (dimmable): up to 12 lighting points",
        "Engraved keypads",
        "DIN-rail 8-channel Adaptive Phase Dimmers (2 pcs)",
        "HVAC control: 3 zones",
        "Control4 T4 Series 10” Tabletop Touchscreen (Black)",
        "Smart door lock integration",
        "Audio: Speakers or soundbars for up to 2 TVs",
        "Curtain control",
        "Occupancy sensor & voice assistant integration",
        "Control4 mobile app",
        "Installation, configuration & programming",
      ],
    },
  },
};