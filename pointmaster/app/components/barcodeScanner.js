import React, { useState, useEffect, useContext } from "react";
impo
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BillContext } from '../../context/BillContext';

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
    //call addProductToBill function with the scanned data
    addProductToBill(data);
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
          <Button title={"Add another item"} onPress={handleAddItem} />
          <Button title={"Cancel"} onPress={handleCancel} />
          <Button title={"Proceed"} onPress={handleProceed} />
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
    flex: 1,
    justifyContent: "center",
   
  },
  barcodeContainer: {
    width: "90%",
    height: "100%",
    overflow: "hidden",
    justifyContent: "center",
    borderRadius: 10,
    marginTop : 10,
    
  },
  barcodeScanner: {
    width: "100%",
    height: "100%",
  },
});