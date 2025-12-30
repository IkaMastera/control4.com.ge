import {
  type LucideIcon,
  ShieldAlert,
  Droplets,
  Film,
  ThermometerSnowflake,
  Wind,
  Music,
  Blinds,
  LampCeiling,
  Lightbulb,
  MonitorPlay,
  Heater,
  Palette,
  Power,
} from "lucide-react";

export type RoomId = "kitchen" | "living" | "bedroom" | "bathroom" | "office" | "demo";

export type FeatureId =
  | "mainLighting"
  | "backLighting"
  | "curtains"
  | "warmFloor"
  | "music"
  | "ac"
  | "tv"
  | "bedHeaters"
  | "bedLed"
  | "pcOn"
  | "security"
  | "antiFloodKitchen"
  | "antiFloodBathroom"
  | "cinema";

export type Feature = {
  id: FeatureId;
  label: string;
  Icon: LucideIcon;
};

export const ROOMS: { id: RoomId; label: string }[] = [
  { id: "kitchen", label: "Kitchen" },
  { id: "living", label: "Living room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "bathroom", label: "Bathroom" },
  { id: "office", label: "Office" },
  { id: "demo", label: "Demonstration" },
];

export const ROOM_FEATURES: Record<Exclude<RoomId, "demo">, Feature[]> = {
  kitchen: [
    { id: "mainLighting", label: "Main lighting", Icon: LampCeiling },
    { id: "backLighting", label: "Back lighting", Icon: Lightbulb },
    { id: "warmFloor", label: "Warm floor", Icon: ThermometerSnowflake },
  ],
  living: [
    { id: "mainLighting", label: "Main lighting", Icon: LampCeiling },
    { id: "warmFloor", label: "Warm floor", Icon: ThermometerSnowflake },
    { id: "tv", label: "TV", Icon: MonitorPlay },
  ],
  bedroom: [
    { id: "warmFloor", label: "Warm floor", Icon: ThermometerSnowflake },
    { id: "bedHeaters", label: "Radiators (2x)", Icon: Heater },
    { id: "bedLed", label: "Bed LED", Icon: Palette },
  ],
  bathroom: [
    { id: "warmFloor", label: "Warm floor", Icon: ThermometerSnowflake },
  ],
  office: [
    { id: "pcOn", label: "PC / Monitors", Icon: Power },
  ],
};

export const DEMO_FEATURES: Feature[] = [
  { id: "security", label: "Security", Icon: ShieldAlert },
  { id: "antiFloodKitchen", label: "Anti-flood kitchen", Icon: Droplets },
  { id: "cinema", label: "Cinema scenario", Icon: Film },
  { id: "ac", label: "Air conditioner", Icon: Wind },
  { id: "curtains", label: "Blinds/Curtains", Icon: Blinds },
  { id: "music", label: "Music", Icon: Music },
];

export const MASKS: Record<RoomId, { polygon: string; hint: string }> = {

  kitchen: {
    polygon: `polygon(
      15% 45%,  /* top-left (near window) */
      35.6% 30.6%,  /* top-right (near sink wall) */
      51.0% 45.0%,  /* bottom-right (toward corridor) */
      32.6% 65.6%   /* bottom-left (near glass wall) */
    )`,
    hint: "Kitchen floor only",
  },


  living: {
    polygon: `polygon(
      50% 50%,  /* inner-top */
      53% 47%,  /* correction */
      66% 58%,  /* right-mid */
      64% 60%,  /* bottom-right */
      49% 77%,  /* bottom-left baseline */
      43% 89%,  /* NEW: reach into that circled left area */
      28% 76%   /* NEW: return upward so it doesn't grab kitchen */
    )`,
    hint: "Living room only",
  },


  bathroom: {
    polygon: `polygon(
      45% 26%,  /* top-left of bathroom (under the top wall) */
      62% 25%,  /* top-right of bathroom */
      62% 27%,  /* bottom-right of bathroom */
      56% 32%,  /* bottom edge dips a bit (toward corridor) */
      50% 32%   /* inner notch so it doesn't leak left into kitchen */
    )`,
    hint: "Top center (bathroom)",
  },


  bedroom: {
    polygon: `polygon(
      71.5% 27%,  /* upper-left bedroom boundary */
      94% 45%,  /* upper-right bedroom boundary (near right wall) */
      75% 72%,  /* mid/bottom-right boundary */
      70% 62%,  /* bottom-left bedroom boundary */
      55% 45%   /* inner connection back toward corridor */
    )`,
    hint: "Right side (bedroom)",
  },

  office: {
    polygon: `polygon(
      62% 60%,  /* top-left office boundary */
      78% 58%,  /* top edge toward right */
      92% 70%,  /* right edge */
      86% 94%,  /* bottom-right edge */
      60% 92%   /* bottom-left edge */
    )`,
    hint: "Bottom-right nook (office)",
  },

  demo: {
    polygon: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    hint: "Whole home (demo overlays)",
  },
};

export const VIDEO_BY_ROOM_FEATURE: Partial<Record<RoomId, Partial<Record<FeatureId, string>>>> = {
  living: {
    warmFloor: "/videos/showroom360/floor-heating.webm",
    tv: "/videos/showroom360/TV.webm",
    mainLighting: "/videos/showroom360/lighting.webm",
  },
  kitchen: {
    warmFloor: "/videos/showroom360/floor-heating.webm",
    mainLighting: "/videos/showroom360/chandelier.webm",
    backLighting: "/videos/showroom360/kitchen-backlight.webm",
  },
  bedroom: {
    warmFloor: "/videos/showroom360/floor-heating.webm",
    bedLed: "/videos/showroom360/bed-led.webm",
    bedHeaters: "/videos/showroom360/radiators.webm",
  },
  office: {
    pcOn: "/videos/showroom360/office-pc.webm",
  },
  bathroom: {
    warmFloor: "/videos/showroom360/floor-heating.webm",
  },

  demo: {
    security: "/videos/showroom360/security.webm",
    antiFloodKitchen: "/videos/showroom360/smart-leak.webm",
    cinema: "/videos/showroom360/movie-scenario.webm",
    ac: "/videos/showroom360/air-conditioning.webm",
    curtains: "/videos/showroom360/curtains.webm",
    music: "/videos/showroom360/music.webm",
  },
};