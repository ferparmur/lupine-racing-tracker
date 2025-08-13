import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../theme";

type Props = {
  label: string;
  children?: ReactNode;
};

export const FieldSet: React.FC<Props> = ({ label, children }) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.labelWrapper]}>
        <Text style={[styles.label]}>{label}</Text>
      </View>
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: theme.border.width[1],
    borderRadius: theme.border.radius[2],
    borderColor: theme.colors.anthracite,
    padding: 12,
    position: "relative",
    marginBlockStart: theme.spacing[3],
  },
  labelWrapper: {
    position: "absolute",
    top: -10,
    left: 12,
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    backgroundColor: theme.colors.white,
  },
});
