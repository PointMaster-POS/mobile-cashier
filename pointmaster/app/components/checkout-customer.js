import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Image,
} from "react-native";
import { BillContext } from "../../context/billcontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import BarcodeScanner from "./customerbarcodescanner"; // Importing the BarcodeScanner component
import { cashierUrl } from "../../apiurl";

const CheckOutCustomer = () => {
  // states to handle modal visibility and phone number and context
  const { customer, setCustomer } = useContext(BillContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isScannerVisible, setIsScannerVisible] = useState(false); // State for showing scanner

  // ----------------- Handle Modal Visibility -----------------
  const handleOpenAddCustomerModel = () => {
    setIsModalVisible(true);
  };

  // ----------------- Handle Save Customer -----------------
  const handleSaveCustomer = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");

    try {
      const url = cashierUrl;
      const response = await axios.get(
        `${url}/cashier/customer/${phoneNumber}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      setIsModalVisible(false);
      setCustomer(response.data);
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
      setCustomer(null);
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

  // ----------------- Render -----------------
  return (
    <View>
      {customer ? (
        <View style={styles.mainCustomerContainer}>
          {/* Display customer image */}
          <View style={styles.customerDContainer}>
            <Image
              source={customer.photo_url ? { uri: customer.photo_url } : null}
              style={styles.customerImage}
            />

            <View style={styles.customerContainer}>
              <Text style={styles.customerText}>
                Customer: {customer.customer_name}
              </Text>
              <Text style={styles.tableText}>Points: {customer.points}</Text>
            </View>
          </View>
          <View style={styles.editButtonContainer}>
            <TouchableOpacity onPress={handleOpenAddCustomerModel}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={handleOpenAddCustomerModel}>
          <View style={styles.noCustomerContainer}>
            <Text style={styles.customerText}>No Customer</Text>
            <View style={styles.addCustomerContainer}>
              <Text style={styles.addCustomer}>Add Customer</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/* Modal for adding customer */}
      {isModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Customer</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter Phone Number"
                value={phoneNumber}
                keyboardType="phone-pad"
                onChangeText={setPhoneNumber}
              />

              <View style={styles.modalButtons}>
                <Button
                  title="Cancel"
                  onPress={() => setIsModalVisible(false)}
                />
                <Button title="Save" onPress={handleSaveCustomer} />
              </View>

              {/* Toggle Barcode Scanner visibility */}
              <Button
                title={isScannerVisible ? "Hide Scanner" : "Show Scanner"}
                onPress={() => setIsScannerVisible(!isScannerVisible)}
                styles={styles.scannerButton}
              />

              {/* Display Barcode Scanner if visible */}
              {isScannerVisible && (
                <View style={styles.scannerContainer}>
                  <BarcodeScanner
                    addCustomerToBill={setCustomer}
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                  />
                </View>
              )}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

// ----------------- Styles -----------------

const styles = StyleSheet.create({
  customerDContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  customerImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 20,
  },
  addCustomer: {
    color: "#5e48a6",
    fontWeight: "bold",
  },
  addCustomerContainer: {
    padding: 20,
    backgroundColor: "#e3d1f9",
    borderRadius: 10,
  },
  noCustomerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#e3d1f9",
    borderRadius: 10,
    margin: 10,
  },
  customerContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  customerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tableText: {
    fontSize: 16,
  },
  mainCustomerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  editButtonContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 350,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  scannerContainer: {
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  scannerButton: {
    marginBottom: 20,
    backgroundColor: "#5e48a6",
  },
});

export default CheckOutCustomer;
