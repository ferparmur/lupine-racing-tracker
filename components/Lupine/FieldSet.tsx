import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../theme";
import Lupine from "./index";

type Props = {
  label: string;
  children?: ReactNode;
};

export const FieldSet: React.FC<Props> = ({ label, children }) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.labelWrapper]}>
        <Lupine.Text style={[styles.label]}>{label}</Lupine.Text>
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
    marginBlockStart: theme.spacing[5],
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
