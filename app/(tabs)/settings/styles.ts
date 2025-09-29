import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
  },
  email: {
    fontSize: 16,
    color: colors.muted,
  },
  bio: {
    fontSize: 14,
    color: colors.text,
    marginTop: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
});
