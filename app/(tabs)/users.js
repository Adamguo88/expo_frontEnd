import Loading from "@components/ui/Loading";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { StyleSheet } from "react-native";

export default function Users() {
  const clients = Array.from({ length: 200 }).map((_, index) => ({ id: index + 1, name: `客戶${index + 1}` }));
  const [initialData, setIsInitialData] = useState(clients?.slice(0, 20));
  const [count, setCount] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [isHasMore, setIsHasMore] = useState(false);

  const onLoadMore = async () => {
    if (!isLoading && !isHasMore) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const dataLength = 20 * count;
      const newRenderData = clients?.slice(dataLength, dataLength + 20);
      const isNotMore = dataLength + 20 >= 60;
      // console.log(dataLength + 20, isNotMore);

      setCount((c) => c + 1);
      setIsInitialData((init) => [...init, ...newRenderData]);
      setIsLoading(false);
      setIsHasMore(isNotMore);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>客戶列表</Text>
      <FlatList
        data={initialData}
        renderItem={({ item }) => (
          <View style={styles.clients}>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        // refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleEvent.onMobileRefresh} tintColor={"#1f99b0"} />}
        // 觸底加載
        onEndReached={onLoadMore}
        // 到全部內容20%的時候加載更多
        onEndReachedThreshold={0.2}
        ListFooterComponent={<RenderFooter isLoading={isLoading} hasMore={isHasMore} />}
      />
    </View>
  );
}

export function RenderFooter({ isLoading, hasMore }) {
  console.log(isLoading, hasMore);

  if (isLoading) {
    return (
      <View style={styles.footer}>
        <Loading size="small" color="#1f99b0" />
      </View>
    );
  }
  if (hasMore) {
    return (
      <View style={styles.footer}>
        <Text style={styles.noMoreDataText}>--- 已經到底了，沒有更多數據 ---</Text>
      </View>
    );
  }
  return null;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    marginTop: 10,
    marginBottom: 10,
  },
  clients: {
    backgroundColor: "#1f99b0",
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  noMoreDataText: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
  },
});
