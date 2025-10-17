import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

export function ModalCloseBtn() {
  const router = useRouter();
  const eventBack = () => {
    if (router.canGoBack()) {
      router.dismiss();
      console.log("success");
    } else {
      router.navigate("/news");
    }
  };
  return (
    <View style={{ width: 30 }}>
      <TouchableOpacity onPress={eventBack}>
        <SimpleLineIcons name="close" size={24} color="#1f99b0" />
      </TouchableOpacity>
    </View>
  );
}
