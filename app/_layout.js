import React from "react";
import { Stack } from "expo-router";
import { ModalCloseBtn } from "@components/ModalCloseBtn";
import { NotificationProvider } from "@components/context/NotificationContext";

export default function Layout() {
  return (
    <NotificationProvider>
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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="index" options={{ title: "測試" }} /> */}
        <Stack.Screen name="courses/index" options={{ title: "課程列表" }} />
        <Stack.Screen
          name="stock/[id]"
          options={{
            presentation: "modal",
            title: "股票",
            headerLeft: () => <ModalCloseBtn />,
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
    </NotificationProvider>
  );
}
