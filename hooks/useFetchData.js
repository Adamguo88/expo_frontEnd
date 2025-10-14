import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export default function useFetchData({ isKeyword = "", isCallSearch = false }) {
  const [isCourse, setIsCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      Keyboard.dismiss();
      setIsLoading(true);
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}?search=${isKeyword}`);
      const { data } = await response.json();
      console.log(data);
      setIsCourse(data);
    } catch (error) {
      Promise.reject(new Error("身分證格式驗證失敗"));
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const onReload = async () => {
    setIsError(false);
    await fetchData();
  };

  useEffect(() => {
    if (isCallSearch) {
      fetchData();
    }
  }, [isCallSearch]);

  useEffect(() => {
    const value = Math.round(Math.random() * 100);
    if (value < 10) {
      setIsError(true);
    }
  }, []);

  return { isCourse, isLoading, isError, setIsCourse, onReload };
}
