import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import BarcodeScanner from '../components/barcodeScanner';
import BillContent from '../components/billcontent';
import { BillContext } from '../../context/billcontext';
import CheckOutButton from '../components/checkout-button';

const Main = () => {
    const { billItems, addProductToBill, increaseQuantity, decreaseQuantity, i } = useContext(BillContext); 

    return (
        <SafeAreaView style={styles.container}>
            <BillContent items={{ bill: billItems, i: i }} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
            <CheckOutButton />
            <BarcodeScanner addProductToBill={addProductToBill} />
        </SafeAreaView>
    );
}

export default Main;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center", // Ensures everything is centered
      alignItems: "center", // Aligns items in the center horizontally
      backgroundColor: "#fff", // Optional: Adds a white background
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: "10%", // Adjusted height for buttons
      width: "90%",
      borderRadius: 10,
      margin: 10,
      backgroundColor: "#5e48a6",
      paddingHorizontal: 40,
    },
    barcodeContainer: {
      flex: 1, // This makes sure the barcode container takes up the available space
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    barcodeScanner: {
      flex: 1, // Ensures the scanner takes up the available space inside the container
      width: "100%", // Scanner will fill the container horizontally
    },
    buttonText: {
      color: "#e3d1f9",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
  