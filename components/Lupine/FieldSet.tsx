import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "./Text";
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
    padding: theme.spacing[4],
    position: "relative",
    marginBlockStart: theme.spacing[3],
    marginBlockEnd: theme.spacing[6],
  },
  labelWrapper: {
    position: "absolute",
    top: -theme.spacing[3],
    left: theme.spacing[2],
  },
  label: {
    paddingHorizontal: theme.spacing[2],
    backgroundColor: theme.colors.white,
  },
});
