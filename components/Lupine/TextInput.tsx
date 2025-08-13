import React from "react";
import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
  Text,
} from "react-native";
import { theme } from "../../theme";

export const TextInput: React.FC<TextInputProps> = ({ editable, ...props }) => {
  return (
    <RNTextInput
      style={[
        styles.textInput,
        editable ? undefined : styles.textInputDisabled,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: theme.border.width[1],
    borderColor: theme.colors.midnight,
    borderRadius: theme.border.radius[2],
    padding: theme.spacing[3],
    fontSize: 16,
  },

  textInputDisabled: {
    opacity: 0.5,
  },
});
