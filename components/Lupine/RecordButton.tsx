import React from "react";
import {
  StyleSheet,
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { theme } from "../../theme";

interface RecordButtonProps extends TouchableOpacityProps {
  active: boolean;
}

export const RecordButton: React.FC<RecordButtonProps> = ({
  active,
  ...props
}) => {
  return (
    <View style={[styles.container]}>
      <RNTouchableOpacity
        activeOpacity={1}
        style={[styles.default, active ? styles.active : undefined]}
        {...props}
      ></RNTouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: 48,
    paddingLeft: 3,
    paddingTop: 3,
  },

  default: {
    borderRadius: 99999999,
    backgroundColor: theme.colors.grapefruit,
    height: 42,
    width: 42,
    borderColor: theme.colors.white,
    borderWidth: theme.border.width[2],
    outlineColor: theme.colors.midnight,
    outlineWidth: theme.border.width[2],
  },

  active: {
    backgroundColor: theme.colors.meadow,
  },
});
