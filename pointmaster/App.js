import React from "react";
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
const Stack = createNativeStackNavigator();
import { showMessage } from "react-native-flash-message";
export default function App() {
  const [isScanMode, setIsScanMode] = React.useState(false);

  //button to toggle between scan and menu
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
        <Stack.Navigator>
          <Stack.Screen 
            name="Menu" 
            component={isScanMode ? Main : Menu}
            options={{
              title: isScanMode ? "SCAN MODE" : "MENU",
              headerRight: () => (
                <TouchableOpacity 
                  onPress={toggleScanMode} 
      
                >
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
                  onPress={() => showMessage({
                    message: "Showing all hold bills within 2 hours",
                    type: "info",
                    color: "#fff",
                    backgroundColor: "#5e48a6",
                    icon: "info",
                    duration: 3000,
                  })}
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
