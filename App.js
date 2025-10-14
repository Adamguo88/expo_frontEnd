import { StyleSheet, View } from "react-native";
import ProductScreen from "./components/productScreen";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <View style={[styles.container, { height: "100%", width: "100%" }]}>
          <StatusBar style="dark" />
          <ProductScreen />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#rgb(222 222 222)",
  },
});
