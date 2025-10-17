import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

export default function news() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>最新資訊</Text>

      <Link asChild href="courses" style={styles.btn}>
        <TouchableOpacity>
          <Text style={{ color: "#fff", textAlign: "center" }}>前往課程頁</Text>
        </TouchableOpacity>
      </Link>
      <Link asChild href="/stock/1" style={[styles.btn, { backgroundColor: "darkslategray" }]}>
        <TouchableOpacity>
          <Text style={{ color: "#fff", textAlign: "center" }}>前往股票</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: "50%",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "darkgreen",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
});
