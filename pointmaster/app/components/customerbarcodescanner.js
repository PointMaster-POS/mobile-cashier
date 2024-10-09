import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BarcodeScanner = ({ addCustomerToBill ,isModalVisible, setIsModalVisible }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    showMessage({
      message: `Scanned barcode with data: ${data}`,
      type: "info",
      color: "#fff",
      backgroundColor: "#5e48a6",
      icon: "info",
      duration: 3000,
    });

    // Fetch customer details using the scanned barcode (assuming it's a phone number or unique customer identifier)
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log(data);
    try {
        
      const response = await axios.get(
        `http://209.97.173.123:3003/cashier/customer/${data}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      addCustomerToBill(response.data);
      showMessage({
        message: "Customer added successfully",
        type: "success",
        color: "#fff",
        backgroundColor: "#5e48a6",
        icon: "success",
        duration: 3000,
      });
        setIsModalVisible(false);
    } catch (error) {
      console.error("Error:", error.message);
      addCustomerToBill(null);
      showMessage({
        message: "Customer not found",
        type: "danger",
        color: "#fff",
        backgroundColor: "#5e48a6",
        icon: "info",
        duration: 3000,
      });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.cameraContainer, { width: screenWidth * 0.8, height: screenHeight * 0.4 }]}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
      {scanned && (
        <Button
          title={"Tap to Scan Again"}
          onPress={() => setScanned(false)}
          color="#5e48a6"
        />
      )}
    </View>
  );
};

export default BarcodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
});
