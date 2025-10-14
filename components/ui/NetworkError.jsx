import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function NetworkError({ onReload }) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error" size={32} color="red" />
      <Text style={styles.title}>抱歉，網路連接出現錯誤！</Text>

      <TouchableOpacity style={styles.reload} onPress={onReload}>
        <Text style={styles.label}>重新加載</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 5,
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },

  reload: {
    marginTop: 10,
    backgroundColor: "#1f99b0",
    height: 40,
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  label: {
    color: "#fff",
    lineHeight: 40,
  },
});
