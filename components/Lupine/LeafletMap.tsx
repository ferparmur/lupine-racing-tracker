import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { RaceConfig } from "../../types/raceConfig";
import { useAssets } from "expo-asset";

interface LeafletMapProps {
  raceConfig?: RaceConfig;
}

export const LeafletMap = ({ raceConfig }: LeafletMapProps) => {
  const leafletHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <style>
          html, body, #map {
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>

        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          const raceConfig = ${JSON.stringify(raceConfig)};
          const map = L.map('map', {
            zoomControl: false
          }).setView([51.505, -0.09], 13);

          L.tileLayer('http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          
          if(raceConfig.hasOwnProperty('start_geofence') && raceConfig.hasOwnProperty('end_geofence')) {
            //TODO: Load marker icons from App Assets 
            const startMarkerIcon = L.icon({
              iconUrl: 'https://fav.farm/%F0%9F%8F%81',
              iconSize: [32, 32],
              iconAnchor: [3, 32],
              popupAnchor: [13, -35],
            });
            
            const checkpointMarkerIcon = L.icon({
              iconUrl: 'https://fav.farm/%F0%9F%9A%A9',
              iconSize: [32, 32],
              iconAnchor: [3, 32],
              popupAnchor: [13, -35],
            });
            
            L.marker([raceConfig.start_geofence.latitude, raceConfig.start_geofence.longitude], {
                icon: startMarkerIcon,
            }).addTo(map)
              .bindPopup('Start')
              .openPopup();
            
            L.marker([raceConfig.end_geofence.latitude, raceConfig.end_geofence.longitude], {
                icon: startMarkerIcon,
            }).addTo(map)
              .bindPopup('Finish')
              .openPopup();
            
            raceConfig.checkpoints.forEach((checkpoint) => {
              L.marker([checkpoint.latitude, checkpoint.longitude], {
                icon: checkpointMarkerIcon,
              }).addTo(map);
            });
            
            const bounds = raceConfig.checkpoints.map((checkpoint) => [checkpoint.latitude, checkpoint.longitude]);
            bounds.push([raceConfig.start_geofence.latitude, raceConfig.start_geofence.longitude]);
            bounds.push([raceConfig.end_geofence.latitude, raceConfig.end_geofence.longitude]);
            map.fitBounds(bounds);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: leafletHTML }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
