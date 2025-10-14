import { useEffect, useReducer } from "react";

const initialState = {
  data: [],
  loading: true,
  error: false,
};

const ACTION = {
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  SET_DATA: "SET_DATA",
  RELOAD_START: "RELOAD_START",
};

const reducer = (state, action) => {
  if (action.type === ACTION.FETCH_SUCCESS) {
    return { ...state, loading: false, error: false, data: action.payload };
  }
  if (action.type === ACTION.FETCH_ERROR) {
    Promise.reject(new Error("API呼叫失敗"));
    return { ...state, loading: false, error: true };
  }
  if (action.type === ACTION.SET_DATA) {
    return { ...state, data: action.payload };
  }
  if (action.type === ACTION.RELOAD_START) {
    return { ...state, loading: true, error: false };
  }
  return state;
};

export default function useReducerFetchData({ isKeyword = "", isCallSearch = false }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}?search=${isKeyword}`);
      const { data } = await response.json();
      console.log(data);
      dispatch({ type: ACTION.FETCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ACTION.FETCH_ERROR });
    }
  };
  const onReload = async () => {
    dispatch({ type: ACTION.RELOAD_START });
    await fetchData();
  };
  const setIsCourse = (data = []) => {
    dispatch({ type: ACTION.SET_DATA, payload: data });
  };

  useEffect(() => {
    if (isCallSearch) {
      fetchData();
    }
  }, [isCallSearch]);

  useEffect(() => {
    const value = Math.round(Math.random() * 100);
    if (value < 60) {
      dispatch({ type: ACTION.FETCH_ERROR });
    }
  }, []);

  return {
    isCourse: state.data,
    isLoading: state.loading,
    isError: state.error,
    setIsCourse,
    onReload,
  };
}
