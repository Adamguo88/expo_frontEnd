import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function Loading({ size = "small", color = "#000" }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} style={styles.loading} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});
