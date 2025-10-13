import { useWindowDimensions } from "react-native";

// 定義一個判斷是否為平板的 Hook
const TABLET_BREAKPOINT = 768; // 通常以 768 像素作為手機與平板的分界點

export const useDeviceType = () => {
  const { width } = useWindowDimensions();

  // 判斷是否為平板 (通常是螢幕寬度大於 768 像素)
  const isTablet = width >= TABLET_BREAKPOINT;
  const isPhone = !isTablet;

  return { isTablet, isPhone, screenWidth: width };
};
