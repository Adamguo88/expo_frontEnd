import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Stocks() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.text}>2330</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "darkgreen",
    fontSize: 18,
    fontWeight: "bold",
  },
});
