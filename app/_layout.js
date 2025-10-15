import React from "react";
import { Image } from "expo-image";
import { Link, Stack } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        title: "", // 若沒有設置title不顯示
        headerTitleAlign: "center",
        animation: "slide_from_right",
        headerTintColor: "#1F99b0",
        headerTitleStyle: {
          fontWeight: "400",
          color: "#2A2929",
          fontSize: 16,
        },
        headerBackButtonDisplayMode: "minimal", // 隱藏 ios 返回按鍵會出現route
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLeft: (props) => <HeaderLogo {...props} />,
          // headerTitle: (props) => <HeaderLogo {...props} />,
          headerRight: () => <HeaderIcons name="paper-plane" href="/messages" style={styles.headerRight} />,
        }}
      />
      <Stack.Screen
        name="product/[id]"
        options={({ route }) => {
          const name = route?.params?.name;
          return { title: `產品內頁${route?.params?.id}${name ? "_" + name : ""}` };
        }}
      />
    </Stack>
  );
}

// Logo 模組
export function HeaderLogo() {
  return <Image style={styles.logo} contentFit="contain" source={require("@assets/logo.png")} />;
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
