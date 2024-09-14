import React, { useState , useContext} from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

// import { UserContext } from "../context/userContext";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { UserContext } from "../../context/usercontext";
import axios from "axios";

const LoginScreen = () => {
 const { setIsLoggedIn} = useContext(UserContext);


  const navigation = useNavigation();


  //states to handle user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //function to handle register button press
  const _handlePressButtonAsync = async () => {
    navigation.navigate("Register");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3002/employee/login", {
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
        setIsLoggedIn(true);
        // navigation.navigate("Home", { user: response.data });
        await AsyncStorage.setItem("accessToken", response.data.toString());
        console.log(await AsyncStorage.getItem("accessToken"));
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

//styles for login screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C8ACD6",
  },
  registerLinkText: {
    color: "#433D8B",
    textDecorationLine: "underline",
  },
  registerText: {
    marginTop: 100,
    justifyContent: "center",
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