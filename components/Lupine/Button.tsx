import React from "react";
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  Text,
} from "react-native";
import { theme } from "../../theme";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "outline";
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
});
