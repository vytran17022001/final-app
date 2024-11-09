import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../pages/Home";
import DetailsScreen from "../pages/MovieDetail";
import OrderScreen from "../pages/Order";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MovieDetail" component={DetailsScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
    </Stack.Navigator>
  );
}
