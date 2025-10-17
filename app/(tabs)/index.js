import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Main from "@components/main";
import { useNotifications } from "@components/context/NotificationContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <PostNotificationTest />
      <Main />
    </SafeAreaProvider>
  );
}

export function PostNotificationTest() {
  // 從 Context 中取出所需的函數和狀態
  const { expoPushToken, notification, scheduleLocalNotification } = useNotifications();
  console.log(expoPushToken);

  useEffect(() => {
    const notificationData = notification?.request?.content?.data;
    if (notificationData?.source === "web") {
      scheduleLocalNotification({
        title: "X合約強制平倉通知",
        body: "很遺憾通知您，由於您在X本位合約帳戶，受到X影響，導致在2025/10/17 11:20:00時發生爆倉，系統將自動售出全部合約",
        seconds: 20,
        data: { source: "system", dataSource: "測試當從Web接收到Notification訊息，主動發送通知給用戶", time: new Date().toISOString() },
      });
    }
    console.log(notificationData);
  }, [notification]);

  const handleSendNotification = () => {
    // 這裡可以直接使用 scheduleLocalNotification，並傳遞所需參數
    scheduleLocalNotification({
      title: "測試Notification",
      body: "內文主體。",
      seconds: 10, // 3 秒後發送
      data: { page: "home", time: new Date().toISOString() },
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>通知測試頁面</Text>

      <Text style={styles.text}>Token: {expoPushToken || "正在獲取..."}</Text>

      <Button title="點擊發送本地通知 (10秒後)" onPress={handleSendNotification} />

      <View style={styles.notificationDisplay}>
        <Text style={styles.subtitle}>最近收到的數據:</Text>
        <Text>{JSON.stringify(notification?.request?.content.data)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (樣式)
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, fontWeight: "bold", marginTop: 20 },
  text: { marginBottom: 15, textAlign: "center" },
  notificationDisplay: { marginTop: 20, padding: 10, backgroundColor: "#f0f0f0", borderRadius: 5, maxHeight: 200 },
});
