import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Courses() {
  return (
    <View style={style.container}>
      <Text style={style.title}>課程首頁</Text>
      <Text style={style.text}>課程_React</Text>
      <Text style={style.text}>課程_Css</Text>
      <Text style={style.text}>課程_HTML</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: "darkgreen",
    fontWeight: "900",
  },
  text: {
    fontSize: 16,
    color: "darkslateblue",
    fontWeight: "500",
  },
});
