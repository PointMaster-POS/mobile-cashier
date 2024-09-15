import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BillContext } from "../../context/billcontext";
import { AntDesign } from "react-native-vector-icons";

export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { addProductToBill } = useContext(BillContext);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleAddItem = () => {
    setScanned(false);
  };

  const handleCancel = () => {
    alert("Cancel button pressed");
  };

  const handleProceed = () => {
    alert("Proceed button pressed");
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    //fetch item from the server
    const accessToken = await AsyncStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `http://localhost:3003/cashier/inventory/product/barcode/${data}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const item = response.data;

      addProductToBill(item);
      console.log(data);
    } catch (error) {
      console.error("Error:", error.message);
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
      {scanned ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.buttonContainer]}
            onPress={handleAddItem}
          >
            <Text style={styles.buttonText}>Add More</Text>
            <AntDesign name="pluscircle" size={24} color="#e3d1f9" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.barcodeContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.barcodeScanner}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "90%",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#5e48a6",
    paddingHorizontal: 40,
  },
  barcodeContainer: {
    width: "90%",
    height: "100%",
    overflow: "hidden",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  barcodeScanner: {
    width: "100%",
    height: "100%",
  },
  buttonText: {
    color: "#e3d1f9",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
