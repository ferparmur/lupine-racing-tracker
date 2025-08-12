import type geofenceConfig from "./geofenceConfig";

export type RaceConfig = {
  name: string;
  logo: string;
  start_time: string;
  end_time: string;
  start_geofence: geofenceConfig;
  end_geofence: geofenceConfig;
  checkpoints: geofenceConfig[];
};
