import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Routes from "./Routes";
import { initializeAuth } from "./store/slices/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Routes />
  );
}

export default App;
