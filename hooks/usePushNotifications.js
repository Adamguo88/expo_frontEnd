// components/hooks/usePushNotifications.js

import { useState, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform, Alert } from "react-native";

// --- 設定前景通知處理器 ---
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// --- 輔助函數：註冊權限並獲取 Token ---
async function registerForPushNotificationsAsync() {
  let token = null;

  if (Platform.OS === "android") {
    // 確保 Android Channel 存在
    await Notifications.setNotificationChannelAsync("default", {
      name: "預設通知頻道",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("通知權限被拒絕", "請在手機設定中開啟應用程式的通知權限。");
      return null;
    }

    // 安全地獲取 projectId (用於 iOS/Android)
    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId || Constants.expoConfig?.extra?.projectId || Constants.expoConfig?.projectId;

    if (!projectId) {
      console.error("錯誤：無法取得 Expo 專案 ID (projectId)。");
      return null;
    }

    token = (await Notifications.getExpoPushTokenAsync({ projectId: projectId })).data;
  } else {
    console.warn("推播通知必須在實機或 EAS 開發建置上測試！");
  }

  return token;
}

// --- 核心 Hook ---
export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [notification, setNotification] = useState(null);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // 1. 註冊並獲取 Token
    registerForPushNotificationsAsync().then(setExpoPushToken);

    // 2. 設置通知監聽器 (App 收到通知)
    notificationListener.current = Notifications.addNotificationReceivedListener((n) => {
      setNotification(n);
      console.log("收到通知:", n.request.content.title);
    });

    // 3. 設置回應監聽器 (用戶點擊通知)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("用戶點擊通知:", response.notification.request.content.data);
      // 可以在這裡添加 Expo Router 導航邏輯: router.push(...)
      Alert.alert("通知被點擊", `數據: ${JSON.stringify(response.notification.request.content.data)}`);
    });

    // 4. 清理
    return () => {
      if (notificationListener.current) {
        Notifications?.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications?.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  // --- 函數：發送本地通知 ---
  const scheduleLocalNotification = async ({ title, body, seconds = 5, data = {} }) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title || "本地通知 📬",
        body: body || "這是預設內容。",
        data: data,
      },
      trigger: {
        seconds: seconds,
        repeats: false,
      },
    });
    Alert.alert("排程成功", `通知將在 ${seconds} 秒後出現。`);
  };

  return {
    expoPushToken,
    notification,
    scheduleLocalNotification, // 這是全局可調用的核心功能
  };
}
