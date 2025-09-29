import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  poster: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.muted,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: colors.text,
  },
});
