import { CALCULATOR_CONFIG as CFG } from "@/data/calculator-config";
import type {
  CalculatorInput,
  DeviceCounts,
  EstimateBreakdown,
  EstimateResult,
  QualityTier,
  PropertyType,
} from "./types";

function pickControllerId(input: CalculatorInput): "core1" | "core3" | "core5" {
  const { areaSqm, experiences } = input;
  const hasWholeAudio = experiences.audio === "wholeHome";
  const hasFullLighting = experiences.lighting === "full" || experiences.lighting === "scenes";

  if (areaSqm > 250 || hasWholeAudio || hasFullLighting) return "core5";
  if (areaSqm > 120) return "core3";
  return "core1";
}


function programmingHoursForTier(tier: QualityTier): number {
  return CFG.pricing.labor.baseProgrammingHours[tier];
}

export function estimateProject(input: CalculatorInput): EstimateResult {
  const sizeFactor = input.areaSqm / 100;

// Adjustments based on property type
  const cameraMultiplierByType: Record<PropertyType, number> = {
    apartment: 0.8, // fewer outdoor cameras typically
    house: 1,
    villa: 1.3,     // more perimeter & outdoor areas
  };

  const apMultiplierByType: Record<PropertyType, number> = {
    apartment: 0.9, // often simpler layout
    house: 1,
    villa: 1.2,     // more APs for yard / multiple wings
  };

  // ----- Lighting -----
  const lightingRule = CFG.rules.lighting;
  const lightingLevel = input.experiences.lighting;
  const loads =
    Math.round(
      lightingRule.baseLoadsPer100Sqm *
        sizeFactor *
        lightingRule.levelMultipliers[lightingLevel]
    ) || 0;

  const mainRooms = input.bedrooms + input.livingAreas;
  const keypads =
    lightingLevel === "none"
      ? 0
      : Math.max(1, mainRooms * lightingRule.keypadPerMainRoom);
  const touchscreens = lightingLevel === "full" ? Math.max(1, Math.round(sizeFactor)) : 0;

  const lightingCost =
    loads * CFG.pricing.lighting.dimmer.unitCost +
    keypads * CFG.pricing.lighting.keypad.unitCost +
    touchscreens * CFG.pricing.lighting.touchscreen.unitCost;

  // ----- Audio -----
  const audioRule = CFG.rules.audio;
  const audioLevel = input.experiences.audio;
  const audioZones = audioRule.zonesByLevel[audioLevel]({
    livingAreas: input.livingAreas,
    bedrooms: input.bedrooms,
  });
  const amps = audioZones === 0 ? 0 : Math.ceil(audioZones / audioRule.ampsPerZones);

  const audioCost = amps * CFG.pricing.audio.zoneAmp.unitCost;

  const climateLevel = input.experiences.climate;
  const climateExtraDevices = CFG.rules.climate.extraPerZoneLevel[climateLevel];
  const climateCost = climateExtraDevices * 300; // TODO: split into real devices

  // ----- Security-----
  const secRule = CFG.rules.security;
  const securityLevel = input.experiences.security;

  const baseCameraCount =
    Math.round(
      secRule.camerasPer100Sqm *
        sizeFactor *
        secRule.levelMultipliers[securityLevel]
    ) || 0;

  let cameraCount = baseCameraCount;

  if (securityLevel !== "none") {
    // Apply property-type factor and ensure a sensible minimum
    const adjusted = Math.round(
      baseCameraCount * cameraMultiplierByType[input.propertyType]
    );
    cameraCount = Math.max(
      input.propertyType === "villa" ? 2 : 1,
      adjusted
    );
  }

  const securityCost = cameraCount * CFG.pricing.security.camera.unitCost;

  // ----- Network -----
  const netRule = CFG.rules.network;
  const networkLevel = input.experiences.network;

  const baseApCount =
    networkLevel === "none"
      ? 0
      : Math.ceil(
          (input.areaSqm / netRule.sqmPerAp) *
            netRule.levelMultipliers[networkLevel]
        );

  let apCount = baseApCount;

  if (networkLevel !== "none") {
    const adjusted = Math.round(
      baseApCount * apMultiplierByType[input.propertyType]
    );
    apCount = Math.max(1, adjusted); // always at least 1 AP when network is enabled
  }

  const routerCount = networkLevel === "none" ? 0 : 1;
  const switchCount = networkLevel === "none" ? 0 : 1;

  const networkCost =
    apCount * CFG.pricing.network.accessPoint.unitCost +
    routerCount * CFG.pricing.network.router.unitCost +
    switchCount * CFG.pricing.network.switchPoE.unitCost;

  const controllerId = pickControllerId(input);
  const controllerCost = CFG.pricing.controllers[controllerId].unitCost;

  const rackNeeded = controllerId !== "core1" || apCount + amps + cameraCount > 4;
  const rackCost = rackNeeded ? CFG.pricing.misc.rack.unitCost : 0;
  const upsCost = rackNeeded ? CFG.pricing.misc.ups.unitCost : 0;

  const totalDevices =
    loads +
    keypads +
    touchscreens +
    audioZones +
    amps +
    cameraCount +
    apCount +
    routerCount +
    switchCount +
    (rackNeeded ? 2 : 0);
  const installLabor =
    totalDevices * CFG.pricing.labor.installPerDevice *
    (input.isRenovation ? CFG.pricing.labor.renovationMultiplier : 1);

  const programmingHours = programmingHoursForTier(input.qualityTier);
  const programmingLabor =
    programmingHours * CFG.pricing.labor.programmingPerHour;

  const laborCost = installLabor + programmingLabor;

  const breakdown: EstimateBreakdown = {
    lighting: lightingCost,
    audio: audioCost,
    climate: climateCost,
    security: securityCost,
    network: networkCost,
    labor: laborCost,
  };

  const subtotal =
    breakdown.lighting +
    breakdown.audio +
    breakdown.climate +
    breakdown.security +
    breakdown.network +
    breakdown.labor +
    controllerCost +
    rackCost +
    upsCost;

  const minTotal = Math.round(subtotal * (1 + CFG.pricing.margin.min));
  const maxTotal = Math.round(subtotal * (1 + CFG.pricing.margin.max));

  const deviceCounts: DeviceCounts = {
    controllers: 1,
    dimmers: loads,
    keypads,
    touchscreens,
    audioZones,
    amps,
    cameras: cameraCount,
    apCount,
    miscDevices: (rackNeeded ? 2 : 0) + routerCount + switchCount,
  };

  return {
    input,
    breakdown,
    subtotal: Math.round(subtotal),
    minTotal,
    maxTotal,
    recommendedControllerId: controllerId,
    deviceCounts,
  };
}
