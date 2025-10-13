import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useDeviceType } from "../hooks/useDeviceType"; // 引入自定義 Hook
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Input from "./ui/Input";

export default function ProductScreen() {
  const [isCourse, setIsCourse] = useState([]);
  const [isKeyword, setIsKeyword] = useState("");
  const { isTablet } = useDeviceType();

  const handleEvent = {
    buttonTest: async () => {
      const response = await fetch(`https://expo-backend-one.vercel.app/api/expo?search=${isKeyword}`);
      const { data } = await response.json();
      console.log(data);
      setIsCourse(data);
    },
  };

  useEffect(() => {
    handleEvent.buttonTest();
  }, [isKeyword]);

  return (
    <View style={styles.container}>
      <Button title="按鈕" onPress={handleEvent.buttonTest} />
      <Input isKeyword={isKeyword} setIsKeyword={setIsKeyword} />
      <Text style={isTablet ? styles.titleTablet : styles.titlePhone}>商品列表</Text>

      {/* 核心佈局變化：使用 Flexbox */}
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
          <ScrollView>
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
    backgroundColor: "gray",
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
