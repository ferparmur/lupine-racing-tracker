import { RaceConfig, raceConfigSchema } from "../types/raceConfig";

export const fetchRaceConfig = async (): Promise<RaceConfig> => {
  const response = await fetch(
    `https://lupine.fparedes.com/assets/race.json?v=${Date.now()}`,
  ); // remote JSON URL
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const raceConfig = raceConfigSchema.safeParse(await response.json());
  if (!raceConfig.success) {
    throw new Error(`Invalid Race Configuration retrieved from Server`);
  }

  return raceConfig.data;
};
