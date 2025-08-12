import { z } from "zod";
import { geofenceConfigSchema } from "./geofenceConfig";

export const raceConfigSchema = z.object({
  name: z.string(),
  logo: z.url(),
  start_time: z.iso.datetime({ offset: true }),
  end_time: z.iso.datetime({ offset: true }),
  start_geofence: geofenceConfigSchema,
  end_geofence: geofenceConfigSchema,
  checkpoints: z.array(geofenceConfigSchema),
});

export type RaceConfig = z.infer<typeof raceConfigSchema>;
