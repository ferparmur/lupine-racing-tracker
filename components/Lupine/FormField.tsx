import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import Lupine from "./index";
import { theme } from "../../theme";

interface FormFieldProps extends ViewProps {
  label?: string;
  noMargin?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  noMargin,
  children,
  ...props
}) => {
  return (
    <View
      style={[
        styles.formField,
        noMargin ? styles.formFieldNoMargin : undefined,
      ]}
      {...props}
    >
      {label ? (
        <Lupine.Text variant="bold" style={styles.fieldLabel}>
          {label}
        </Lupine.Text>
      ) : null}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  formField: {
    marginBlockEnd: theme.spacing[6],
  },
  formFieldNoMargin: {
    marginBlockEnd: 0,
  },
  fieldLabel: {
    marginBottom: theme.spacing[1],
  },
});
