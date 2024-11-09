// import { Link } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import MyTabs from "./navigation/TabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
