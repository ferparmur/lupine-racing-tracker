import { z } from "zod";

export const serverLocationSchema = z.object({
  timestamp: z.iso.datetime({ offset: true }),
  timestampUnix: z.number().int(),
  serverTimestamp: z.iso.datetime({ offset: true }),
  serverTimestampUnix: z.number().int(),
  location: z.object({
    longitude: z.number(),
    latitude: z.number(),
    accuracy: z.number(),
  }),
});

export type ServerLocation = z.infer<typeof serverLocationSchema>;
