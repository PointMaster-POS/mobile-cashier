import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import axios from "axios";

const LoginScreen = () => {
  const navigation = useNavigation();

  // States to handle user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://209.97.173.123:3002/employee/login", {
        email,
        password,
      });

      if (response.data.error) {
        showMessage({
          message: response.data.error,
          type: "danger",
          color: "#fff",
          backgroundColor: "#5e48a6",
          icon: "info",
          duration: 3000,
        });
      } else {
        // Store the token and navigate to Menu
        await AsyncStorage.setItem("accessToken", response.data.accessToken); 
        showMessage({
          message: "Login successful",
          type: "success",
          color: "#fff",
          backgroundColor: "#5e48a6",
          icon: "success",
          duration: 3000,
        });
        navigation.reset({
          index: 0,
          routes: [{ name: "Menu" }],
        });
      }
    } catch (error) {
      showMessage({
        message: "Error: " + error.message,
        type: "danger",
        color: "#fff",
        backgroundColor: "#5e48a6",
        icon: "info",
        duration: 3000,
      });
      console.error("Error:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>PointMaster</Text>
      <Input
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button
        title="Login"
        onPress={handleLogin}
        buttonStyle={styles.loginButton}
      />
    </SafeAreaView>
  );
};

// Styles for login screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C8ACD6",
  },
  loginButton: {
    marginTop: 10,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#433D8B",
  },
  input: {
    width: "100%",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default LoginScreen;
