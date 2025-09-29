import React from "react";
import { Image, Text, View } from "react-native";
import { getProfile } from "../../../utils/dataParser";
import styles from "../settings/styles";

export default function ProfileScreen() {
  const profile = getProfile();

  return (
    <View style={styles.container}>
      <Image source={{ uri: profile.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.email}>{profile.email}</Text>
      <Text style={styles.bio}>{profile.bio}</Text>
    </View>
  );
}