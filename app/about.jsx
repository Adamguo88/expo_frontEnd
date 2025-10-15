import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About</Text>
      <Text>Expo Router Test</Text>

      <Link href="/" asChild style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.routerBtn}>
          <Text style={styles.superLink}>回首頁</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  superLink: {
    fontSize: 16,
    color: "blue",
  },
  routerBtn: {
    backgroundColor: "gray",
    borderColor: "black",
    padding: 10,
    width: "100%",
  },
});
