import { Platform, View, Text, StyleSheet } from "react-native";

export default function CustomHeader() {
  if (Platform.OS !== "web") {
    // 在原生端，我們使用 StatusBar 即可，或讓應用程式自己處理 Header
    return null;
  }

  // 在 Web 端，渲染一個頂部欄位
  return (
    <View style={styles.webHeader}>
      <Text style={styles.headerText}>My Web App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  webHeader: {
    padding: 10,
    backgroundColor: "#f8f8f8", // 模擬狀態欄背景
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    // 您可以根據需要將其固定在頂部
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
