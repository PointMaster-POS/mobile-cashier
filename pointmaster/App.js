import React from "react";
import { Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BillProvider } from "./context/billcontext"; 
import Checkout from "./app/(tabs)/checkout";
import Menu from "./app/(tabs)/menu";
import Main from "./app/(tabs)/main";
import { AntDesign } from "react-native-vector-icons";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isScanMode, setIsScanMode] = React.useState(false);

  //button to toggle between scan and menu
  const toggleScanMode = () => {
    setIsScanMode(!isScanMode);
    alert(`Scan mode ${!isScanMode ? 'enabled' : 'disabled'}`);
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
         
          <Stack.Screen name="Checkout" component={Checkout} />
        </Stack.Navigator>
      </NavigationContainer>
    </BillProvider>
  );
}
