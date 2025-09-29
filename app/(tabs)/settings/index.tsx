import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Link href="/settings/profile" asChild>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.desc}>View and edit your profile details</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/settings/details" asChild>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.desc}>Manage app preferences</Text>
        </TouchableOpacity>
      </Link>
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