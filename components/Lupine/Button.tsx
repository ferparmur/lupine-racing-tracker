import React from "react";
import {
  StyleSheet,
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { theme } from "../../theme";
import { Text } from "./Text";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "outline" | "danger";
  text?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  text,
  style,
  ...props
}) => {
  return (
    <RNTouchableOpacity
      activeOpacity={0.7}
      style={[buttonStyles.default, buttonStyles[variant], style]}
      {...props}
    >
      {text ? (
        <Text style={[buttonTextStyles.default, buttonTextStyles[variant]]}>
          {text}
        </Text>
      ) : null}
    </RNTouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  default: {
    padding: theme.spacing[3],
    borderRadius: theme.border.radius[2],
  },

  // eslint-disable-next-line react-native/no-unused-styles
  primary: {
    backgroundColor: theme.colors.midnight,
  },

  // eslint-disable-next-line react-native/no-unused-styles
  secondary: {
    backgroundColor: theme.colors.cement,
  },

  // eslint-disable-next-line react-native/no-unused-styles
  outline: {
    backgroundColor: "transparent",
    borderColor: theme.colors.midnight,
    borderWidth: 1,
  },

  // eslint-disable-next-line react-native/no-unused-styles
  danger: {
    backgroundColor: "transparent",
    borderColor: theme.colors.red,
    borderWidth: 1,
  },
});

const buttonTextStyles = StyleSheet.create({
  default: {
    textAlign: "center",
  },

  // eslint-disable-next-line react-native/no-unused-styles
  primary: {
    color: theme.colors.white,
  },

  // eslint-disable-next-line react-native/no-unused-styles
  secondary: {
    color: theme.colors.midnight,
  },

  // eslint-disable-next-line react-native/no-unused-styles
  outline: {
    color: theme.colors.midnight,
  },

  // eslint-disable-next-line react-native/no-unused-styles
  danger: {
    color: theme.colors.red,
  },
});
