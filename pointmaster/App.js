import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BillProvider } from "./context/BillContext"; 
import Checkout from "./app/(tabs)/checkout";
import Menu from "./app/(tabs)/menu";
import Main from "./app/(tabs)/main";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <BillProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Menu" component={Menu} /> */}
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Checkout" component={Checkout} />
        </Stack.Navigator>
      </NavigationContainer>
    </BillProvider>
  );
}
