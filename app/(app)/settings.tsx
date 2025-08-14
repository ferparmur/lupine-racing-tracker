import { Switch, View } from "react-native";
import Lupine from "../../components/Lupine";
import { useMMKVObject, useMMKVString } from "react-native-mmkv";
import { RaceConfig } from "../../types/raceConfig";
import { storage } from "../../utils/storage";

export default function Settings() {
  const [raceConfig] = useMMKVObject<RaceConfig>("raceConfig");
  const [userId] = useMMKVString("userId");

  return (
    <Lupine.Container paddingVertical={true}>
      <Lupine.FieldSet label="Tracking Mode">
        <Lupine.FormField label="Battery Saving" noMargin={true}>
          <View
            style={{
              flexDirection: "row",
              gap: 3,
            }}
          >
            <Switch value={true} />
            <Lupine.Text>
              Reduce tracking detail to extend battery life
            </Lupine.Text>
          </View>
        </Lupine.FormField>
      </Lupine.FieldSet>

      <Lupine.FieldSet label="Global Configuration">
        <Lupine.FormField label="Race">
          {raceConfig ? (
            <Lupine.Text>{raceConfig.name} </Lupine.Text>
          ) : (
            <Lupine.Text>No Race Loaded</Lupine.Text>
          )}
        </Lupine.FormField>

        <Lupine.FormField label="User ID">
          <Lupine.Text>{userId}</Lupine.Text>
        </Lupine.FormField>

        <Lupine.FormField noMargin={true}>
          <Lupine.Button
            onPress={() => {
              storage.clearAll();
            }}
            variant="danger"
            text="Reset Configuration"
          />
        </Lupine.FormField>
      </Lupine.FieldSet>
    </Lupine.Container>
  );
}
