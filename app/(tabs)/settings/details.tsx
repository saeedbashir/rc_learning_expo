import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SettingDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Settings</Text>
      <Text style={styles.desc}>This is where the settings will go.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  desc: { fontSize: 16, color: "#666" },
});