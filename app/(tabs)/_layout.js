import React from "react";
import { Image } from "expo-image";
import { Link, Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#1f99b0",
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={1} style={[props.style, { backgroundColor: "transparent" }]} />
        ),
        headerTitle: () => null,
        headerLeft: (props) => <HeaderLogo {...props} />,
        headerRight: () => <HeaderIcons name="paper-plane" href="/messages" style={styles.headerRight} />,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "首頁", headerShown: true, headerTitle: "" }} />
      <Tabs.Screen name="news" options={{ title: "最新資訊" }} />
      <Tabs.Screen name="users" options={{ title: "客戶列表" }} />
    </Tabs>
  );
}
// Logo 模組
export function HeaderLogo() {
  return (
    <Link asChild href={"/"}>
      <TouchableOpacity>
        <Image style={styles.logo} contentFit="contain" source={require("@assets/logo.png")} />
      </TouchableOpacity>
    </Link>
  );
}
export function HeaderIcons(props) {
  const { name, ...parameter } = props;
  return (
    <Link asChild {...parameter}>
      <TouchableOpacity>
        <Entypo name={name} size={24} color="balck" />
      </TouchableOpacity>
    </Link>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 130,
    height: 50,
  },
  headerLeft: {
    marginLeft: 15,
  },
  headerRight: {
    marginRight: 15,
  },
});
