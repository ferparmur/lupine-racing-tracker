import { StyleSheet, View, ViewProps } from "react-native";
import { theme } from "../../theme";

interface ContainerProps extends ViewProps {}
export const Container = ({ style, ...props }: ContainerProps) => {
  return <View style={[styles.default, style]} {...props} />;
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    paddingHorizontal: theme.spacing[4],
    backgroundColor: theme.colors.white,
  },
});
