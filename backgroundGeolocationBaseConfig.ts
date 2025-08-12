import BackgroundGeolocation, {
  Config,
} from "react-native-background-geolocation";

export default {
  // Geolocation Config
  allowIdenticalLocations: false,
  desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
  distanceFilter: 1000,
  elasticityMultiplier: 4,

  // Activity Recognition
  stopTimeout: 5,

  // Application config
  activityType: BackgroundGeolocation.ACTIVITY_TYPE_OTHER_NAVIGATION,
  backgroundPermissionRationale: {
    title: "Enable Background Location Settings",
    message:
      "This app requires location in the background to continuously monitor your position in the race map",
  },
  debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
  logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
  notification: {
    title: "Lupine Racing Tracker",
    text: "",
  },
  stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
  startOnBoot: true, // <-- Auto start tracking when device is powered-up.

  // HTTP / SQLite config
  batchSync: true, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
  autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
} as Config;
