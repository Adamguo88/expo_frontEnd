import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, Keyboard, RefreshControl } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDeviceType } from "../hooks/useDeviceType"; // 引入自定義 Hook
import Input from "./ui/Input";
import Loading from "./ui/Loading";
import NetworkError from "./ui/NetworkError";
import useFetchData from "@hooks/useFetchData";
// import useFetchData from "@hooks/useReducerFetchData";

export default function ProductScreen() {
  const [isKeyword, setIsKeyword] = useState("");
  const [isCallSearch, setIsCallSearch] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { isCourse, isLoading, isError, setIsCourse, onReload } = useFetchData({ isKeyword, isCallSearch });
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
  };

  if (isError) {
    return <NetworkError onReload={onReload} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Input isKeyword={isKeyword} setIsKeyword={setIsKeyword} />
        <Button title="按鈕" onPress={handleEvent.callSearch} style={{ borderRadius: 20 }} disabled={isCallSearch} />
      </View>
      <Text style={isTablet ? styles.titleTablet : styles.titlePhone}>商品列表</Text>
      {isLoading ? (
        <Loading size="small" color="#000" />
      ) : (
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
            <ScrollView
              refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleEvent.onMobileRefresh} tintColor={"#1f99b0"} />}
            >
              <View style={[styles.listContainer, isTablet ? styles.listTablet : styles.listPhone]}>
                {isCourse.length >= 1 ? (
                  <React.Fragment>
                    {/* 假設 ProductCard 是您的商品卡片組件 */}
                    {isCourse.map((item) => {
                      return <ProductCard key={item.id} id={item.id} content={item.name} />;
                    })}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <ProductCard key={1} id={1} content={"商品配置1"} />
                    <ProductCard key={2} id={2} content={"商品配置2"} />
                    <ProductCard key={3} id={3} content={"商品配置3"} />
                    <ProductCard key={4} id={4} content={"商品配置4"} />
                    <ProductCard key={5} id={5} content={"商品配置5"} />
                    <ProductCard key={6} id={6} content={"商品配置6"} />
                    <ProductCard key={7} id={7} content={"商品配置7"} />
                    <ProductCard key={8} id={8} content={"商品配置8"} />
                    <ProductCard key={9} id={9} content={"商品配置9"} />
                    <ProductCard key={10} id={10} content={"商品配置10"} />
                    <ProductCard key={11} id={11} content={"商品配置11"} />
                    <ProductCard key={12} id={12} content={"商品配置12"} />
                    <ProductCard key={13} id={13} content={"商品配置13"} />
                    <ProductCard key={14} id={14} content={"商品配置14"} />
                  </React.Fragment>
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
        </SafeAreaProvider>
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
