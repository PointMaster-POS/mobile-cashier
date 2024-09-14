import React, { useState, useEffect } from "react";
import { Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BillProvider } from "./context/billcontext";
import Checkout from "./app/(tabs)/checkout";
import Menu from "./app/(tabs)/menu";
import Main from "./app/(tabs)/main";
import { AntDesign } from "react-native-vector-icons";
import FlashMessage from "react-native-flash-message";
import LoginScreen from "./app/(tabs)/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isScanMode, setIsScanMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in by checking the stored token
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        setIsLoggedIn(true); // Automatically log in if the token exists
      }
    };
    checkLoginStatus();
  }, []);

  // Button to toggle between scan and menu
  const toggleScanMode = () => {
    setIsScanMode(!isScanMode);
    showMessage({
      message: isScanMode ? "You are now in MENU mode" : "You are now in SCAN mode",
      type: "info",
      color: "#fff",
      backgroundColor: "#5e48a6",
      icon: "info",
      duration: 3000,
    });
  };

  return (
    <BillProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "Menu" : "Login"}>
          {/* Login Screen */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          {/* Menu Screen */}
          <Stack.Screen
            name="Menu"
            component={isScanMode ? Main : Menu}
            options={{
              title: isScanMode ? "SCAN MODE" : "MENU",
              headerRight: () => (
                <TouchableOpacity onPress={toggleScanMode}>
                  {isScanMode ? (
                    <AntDesign name="menufold" size={24} color="black" />
                  ) : (
                    <AntDesign name="scan1" size={24} color="black" />
                  )}
                </TouchableOpacity>
              ),
            }}
          />
          {/* Checkout Screen */}
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{
              title: "CHECKOUT",
              headerRight: () => (
                <Button
                  title="Hold Bill"
                  onPress={() =>
                    showMessage({
                      message: "Showing all hold bills within 2 hours",
                      type: "info",
                      color: "#fff",
                      backgroundColor: "#5e48a6",
                      icon: "info",
                      duration: 3000,
                    })
                  }
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </BillProvider>
  );
}
