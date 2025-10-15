import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Message() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Message 頁面</Text>
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
    fontSize: 36,
    fontWeight: "bold",
  },
});
