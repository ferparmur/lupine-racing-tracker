import React from "react";
import { View, ViewProps, StyleSheet, Text } from "react-native";
import { theme } from "../../theme";

interface FormFieldProps extends ViewProps {
  label?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  ...props
}) => {
  return (
    <View style={styles.formField} {...props}>
      {label ? <Text style={styles.fieldLabel}>{label}</Text> : null}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  formField: {
    marginBlockEnd: theme.spacing[6],
  },
  fieldLabel: {
    marginBottom: theme.spacing[1],
  },
});
