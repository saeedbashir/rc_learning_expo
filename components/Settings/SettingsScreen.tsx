import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type SettingsStackParamList = {
  SettingsHome: undefined;
  Profile: undefined;
  SettingDetails: undefined;
};

type NavProp = StackNavigationProp<SettingsStackParamList>;

export default function SettingsScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.desc}>View and edit your profile details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("SettingDetails")}
      >
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.desc}>Manage app preferences</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: "600" },
  desc: { fontSize: 14, color: "#555", marginTop: 4 },
});
