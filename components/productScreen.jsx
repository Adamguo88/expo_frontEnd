import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, RefreshControl, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useDeviceType } from "../hooks/useDeviceType"; // 引入自定義 Hook
import Input from "./ui/Input";
import Loading from "./ui/Loading";
import NetworkError from "./ui/NetworkError";
import useFetchData from "@hooks/useFetchData";
// import useFetchData from "@hooks/useReducerFetchData";
let mockData = Array.from({ length: 15 }).map((_, i) => i + 1);
export default function ProductScreen() {
  const [isKeyword, setIsKeyword] = useState("");
  const [isCallSearch, setIsCallSearch] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { isCourse, isLoading, isError, setIsCourse, onReload } = useFetchData({ isKeyword, isCallSearch });
  const [isMockCount, setIsMockCount] = useState(1);
  const { isTablet } = useDeviceType();

  const handleEvent = {
    callSearch: () => {
      setIsCallSearch(true);
      setTimeout(() => {
        setIsCallSearch(false);
      }, 1000);
    },
    onMobileRefresh: () => {
      setIsRefreshing(true);
      console.log("加載");
      setTimeout(() => {
        setIsRefreshing(false);
      }, 2000);
    },
    onEndReached: () => {
      let newIndex = 15 * isMockCount + 1;
      const newMockData = Array.from({ length: 15 }).map((_, i) => newIndex + i);
      mockData = [...mockData, ...newMockData];
      console.log(mockData);
      setIsMockCount((c) => (c += 1));
    },
  };
  const alertEvent = {
    one: () => {
      Alert.alert("alert按鈕測試1", "這是內文123456789123456789123456789123456789", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    },
    two: () => {
      Alert.alert("alert按鈕測試1", "這是內文123456789123456789123456789123456789", [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed"),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    },
    three: () => {
      Alert.alert("alert按鈕測試1", "這是內文123456789123456789123456789123456789");
    },
  };

  if (isError) {
    return <NetworkError onReload={onReload} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Input isKeyword={isKeyword} setIsKeyword={setIsKeyword} />
        <TouchableOpacity
          onPress={handleEvent.callSearch}
          disabled={isCallSearch}
          activeOpacity={0.7}
          style={[styles.baseButton, isCallSearch && styles.disabledButton]}
        >
          <Text style={[styles.buttonText, { color: "white" }, isCallSearch && styles.disabledText]}>按鈕</Text>
        </TouchableOpacity>
        {/* <Button title="按鈕" onPress={handleEvent.callSearch} disabled={isCallSearch} color="#1f99b0" /> */}
      </View>
      <View style={[styles.search, { width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around" }]}>
        <Button title="alert測試1" color="#1f99b0" onPress={alertEvent.one} />
        <Button title="alert測試2" color="#1f99b0" onPress={alertEvent.two} />
        <Button title="alert測試2" color="#1f99b0" onPress={alertEvent.three} />
      </View>
      <Image style={{ width: 200, height: 200 }} source="https://expo-backend-one.vercel.app/images/pic.jpg" />
      <Text style={isTablet ? styles.titleTablet : styles.titlePhone}>商品列表</Text>
      {isLoading ? (
        <Loading size="small" color="#000" />
      ) : (
        <React.Fragment>
          {isCourse.length >= 1 ? (
            <SafeAreaProvider>
              <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
                <ScrollView
                  refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={handleEvent.onMobileRefresh} tintColor={"#1f99b0"} />
                  }
                >
                  <View style={[styles.listContainer, isTablet ? styles.listTablet : styles.listPhone]}>
                    {isCourse.map((item) => {
                      return <ProductCard key={item.id} id={item.id} content={item.name} />;
                    })}
                  </View>
                </ScrollView>
              </SafeAreaView>
            </SafeAreaProvider>
          ) : (
            <FlatList
              style={styles.flatList}
              data={mockData}
              renderItem={({ item }) => (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <ProductCard key={item} id={item} content={`商品配置${item}`} />
                </View>
              )}
              keyExtractor={(item) => item}
              // 頂部下拉加載
              refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleEvent.onMobileRefresh} tintColor={"#1f99b0"} />}
              // 觸底加載
              onEndReached={handleEvent.onEndReached}
              // 到全部內容20%的時候加載更多
              onEndReachedThreshold={0.2}
            />
          )}
        </React.Fragment>
      )}

      {/* 核心佈局變化：使用 Flexbox */}
    </View>
  );
}

const styles = StyleSheet.create({
  //... 共用樣式
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
    height: "100%",
    width: "100%",
    backgroundColor: "gray",
  },

  search: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  flatList: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%",
  },
  baseButton: {
    backgroundColor: "#1f99b0", // 預設背景色 (來自你的 color prop 邏輯)
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4, // 圓角現在生效了！
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#cccccc", // 禁用時的背景色
  },
  disabledText: {
    color: "#999999", // 禁用時的文字色
  },
  // 標題樣式根據設備調整大小
  titlePhone: { fontSize: 24, padding: 10 },
  titleTablet: { fontSize: 36, padding: 20 },

  listContainer: {
    flex: 1,
    flexDirection: "row", // 始終設定為 row 以利用 flexWrap 實現網格
    flexWrap: "wrap", // 允許子元素換行
    justifyContent: "space-around",
  },

  // **手機佈局 (單欄)**
  listPhone: {
    // 這裡通常不需要額外的設置，因為 item 會佔滿空間
  },

  // **平板佈局 (兩欄/多欄)**
  listTablet: {
    paddingHorizontal: 10,
  },
});

// **商品卡片組件 (ProductCard.js) 的響應式設計**
const ProductCard = ({ id, content = "商品內容" }) => {
  const { isTablet } = useDeviceType();
  const cardWidth = isTablet ? "45%" : "90%"; // 平板佔 45% (兩欄)，手機佔 90% (單欄)

  return (
    <View style={[cardStyles.card, { width: cardWidth }]} key={id}>
      <Text>{content}</Text>
    </View>
  );
};

// ProductCard 的樣式
const cardStyles = StyleSheet.create({
  card: {
    margin: 10,
    height: 150,
    backgroundColor: "rgb(35 187 177)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 200,
    // ... 其他樣式
  },
});
