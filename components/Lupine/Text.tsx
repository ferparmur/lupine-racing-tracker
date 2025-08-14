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
    fontFamily: Platform.select({
      android: "Outfit_400Regular",
      ios: "Outfit-Regular",
    }),
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.midnight,
  },

  bold: {
    fontFamily: Platform.select({
      android: "Outfit_700Bold",
      ios: "Outfit-Bold",
    }),
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.midnight,
  },
});
