import React from "react";
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  Text,
} from "react-native";
import { theme } from "../../theme";

interface ExtendedTouchableOpacityProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "outline";
  text?: string;
}

export const Button: React.FC<ExtendedTouchableOpacityProps> = ({
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
    padding: 10,
    borderRadius: theme.border.radius["2"],
  },
  primary: {
    backgroundColor: theme.colors.midnight,
  },
  secondary: {
    backgroundColor: theme.colors.cement,
  },
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
  primary: {
    color: theme.colors.white,
  },
  secondary: {
    color: theme.colors.midnight,
  },
  outline: {
    color: theme.colors.midnight,
  },
});
