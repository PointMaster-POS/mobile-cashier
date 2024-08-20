import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BillContext } from '../../context/billcontext';
import { AntDesign } from 'react-native-vector-icons';

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
    alert('Cancel button pressed');
  };

  const handleProceed = () => {
    alert('Proceed button pressed');
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    // Here you should transform the scanned data into the appropriate item object.
    // Example:
    const item = {
      qr: data, // Assuming 'data' is the QR code or barcode scanned
      name: 'Scanned Item', // This should be fetched from a database or pre-defined list
      price: 2.5, // The price should also be fetched accordingly
      quantity: 1
    };

    addProductToBill(item);  // Pass the item object to the context function
    console.log(data);
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
          
          <TouchableOpacity style={[styles.buttonContainer]} onPress={handleAddItem}>

            <Text style={styles.buttonText}>Add More</Text>
            <AntDesign name= "pluscircle" size={24} color="#e3d1f9" />

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
