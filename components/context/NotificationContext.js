// components/contexts/NotificationContext.js

import React, { createContext, useContext } from "react";
import { usePushNotifications } from "@hooks/usePushNotifications";

// 1. 定義 Context
const NotificationContext = createContext(undefined);

// 2. 定義 Provider
export function NotificationProvider({ children }) {
  // 在這裡呼叫 Hook
  const value = usePushNotifications();

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

// 3. 定義 Custom Hook (用於在任何組件中輕鬆使用)
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications 必須在 NotificationProvider 內使用");
  }
  return context;
}
