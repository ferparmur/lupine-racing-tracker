import { z } from "zod";

export const geofenceConfigSchema = z.object({
  name: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  radius: z.number().optional(),
});

export type GeofenceConfig = z.infer<typeof geofenceConfigSchema>;
