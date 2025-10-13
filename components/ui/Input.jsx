import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function Input({ isKeyword, setIsKeyword }) {
  return <TextInput style={styles.input} placeholder="輸入關鍵字" onChangeText={(value) => setIsKeyword(value)} defaultValue={isKeyword} />;
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
