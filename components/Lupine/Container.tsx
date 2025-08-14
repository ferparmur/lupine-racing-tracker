import { StyleSheet, View, ViewProps } from "react-native";
import { theme } from "../../theme";

interface ContainerProps extends ViewProps {
  paddingVertical?: boolean;
}
export const Container = ({
  style,
  paddingVertical,
  ...props
}: ContainerProps) => {
  return (
    <View
      style={[
        styles.default,
        paddingVertical ? styles.paddingVertical : undefined,
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    paddingHorizontal: theme.spacing[4],
    backgroundColor: theme.colors.white,
  },

  paddingVertical: {
    paddingVertical: theme.spacing[4],
  },
});
