import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./config/RouterConfig";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { initializeApp } from "./store/root/rootSlice";

function App() {
  const { appLoading } = useSelector((state: any) => state.root);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);
  return <BrowserRouter>{appLoading ? <Spin /> : <Router />}</BrowserRouter>;
}

export default App;
