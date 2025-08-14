import {
  Platform,
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
} from "react-native";
import { theme } from "../../theme";

interface TextProps extends RNTextProps {
  variant?: "default" | "bold";
}
export const Text = ({
  style,
  variant = "default",
  children,
  ...props
}: TextProps) => {
  return (
    <RNText
      style={[
        variant === "default" ? styles.default : undefined,
        variant === "bold" ? styles.bold : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: "Outfit_400Regular",
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.midnight,
  },

  bold: {
    fontFamily: "Outfit_700Bold",
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.midnight,
  },
});
