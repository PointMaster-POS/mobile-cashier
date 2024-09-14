import React, {useState, useContext, useEffect} from "react";
import { Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BillProvider } from "./context/billcontext";
import Checkout from "./app/(tabs)/checkout";
import Menu from "./app/(tabs)/menu";
import Main from "./app/(tabs)/main";
import { AntDesign } from "react-native-vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import LoginScreen from "./app/(tabs)/login";
import { UserProvider } from "./context/usercontext";
import { UserContext } from "./context/usercontext";

const Stack = createNativeStackNavigator();

export default function App() {
  const {  isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [isScanMode, setIsScanMode] = useState(false);


  // button to toggle between scan and menu
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

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    showMessage({
      message: "Login successful! Redirecting to Menu...",
      type: "success",
      color: "#fff",
      backgroundColor: "#28a745",
      icon: "success",
      duration: 3000,
    });
  };

  return (
    <UserProvider>
    <BillProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!isLoggedIn ? (
            // If not logged in, show the LoginScreen
            <Stack.Screen
              name="Login"
              options={{ title: "Login" }}
            >
              {props => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
            </Stack.Screen>
          ) : (
            // After login, show Menu and other screens
            <>
              <Stack.Screen
                name="Menu"
                component={isScanMode ? Main : Menu}
                options={{
                  title: isScanMode ? "SCAN MODE" : "MENU",
                  headerRight: () => (
                    <TouchableOpacity onPress={toggleScanMode}>
                      {isScanMode ? <AntDesign name="menufold" size={24} color="black" /> : <AntDesign name="scan1" size={24} color="black" />}
                    </TouchableOpacity>
                  ),
                }}
              />
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </BillProvider>
    </UserProvider>
  );
}

