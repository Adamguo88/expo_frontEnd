import { StyleSheet, View } from "react-native";
import ProductScreen from "@components/productScreen";
import React from "react";

export default function Main() {
  return (
    <View style={[styles.container, { height: "100%", width: "100%" }]}>
      <ProductScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#rgb(222 222 222)",
  },
});
