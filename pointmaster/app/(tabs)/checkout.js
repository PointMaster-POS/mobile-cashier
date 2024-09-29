import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
  Modal,
} from "react-native";
import { FontAwesome, AntDesign } from "react-native-vector-icons";
import CheckOutCustomer from "../components/checkout-customer";
import { BillContext } from "../../context/billcontext";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Checkout = () => {
  const navigation = useNavigation();
  const [isRedeem, setIsRedeem] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaymentMethodSelected, setIsPaymentMethodSelected] = useState(false);
  const [customerEligibility, setCustomerEligibility] = useState("");
  const {
    billItems,
    total,
    clearBill,
    increaseQuantity,
    decreaseQuantity,
    customer,
  } = useContext(BillContext);

  //check if the customer has enough points to redeem
  const checkCustomerEligibility = async () => {
    console.log(customer);
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log(accessToken);
    if (customer) {
      try {
        // Use POST instead of GET so you can send a body
        const response = await axios.post(
          `http://localhost:3003/cashier/loyalty/eligibility`,
          { customer_id: customer.customer_id }, // The body with customer_id
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json", // Specify content type as JSON
            },
          }
        );

        console.log(response.data);

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
          setCustomerEligibility(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error:", error.message);
        showMessage({
          message: "Error: " + error.message,
          type: "danger",
          color: "#fff",
          backgroundColor: "#5e48a6",
          icon: "info",
          duration: 3000,
        });
      }
    }
    console.log(customerEligibility);
  };

  useEffect(() => {
    if (customer) {
      checkCustomerEligibility();
    }
  }, [customer]);

  /*
{
  "payment_method": "credit_card",
  "total_amount": 150.00,
  "items_list": [
    {
      "item_id": "c2bc3f2c-763f-11ef-a031-0242ac120004",
      "category_id": "a011507e-762b-11ef-8916-0242ac120004",
      "price" : 1000,
      "quantity" : 3
    }
  ],
  "loyalty_points_redeemed": 0,
  "discount" : 100,
  "received" : 200,
  "notes" : "good customer",
  "customer_phone": "123456789",
  "status" : 1
}


  */
  //post request to send the bill details to the backend
  const sendBillDetails = async () => {
    const reducedItems = billItems.map((item) => {
      return {
        item_id: item.item_id,
        category_id: item.category_id,
        price: item.price,
        quantity: item.quantity,
      };
    });
    const data = {
      payment_method: paymentMethod,
      total_amount: total,
      items_list: reducedItems,
      loyalty_points_redeemed: isRedeem ? 1 : 0,
      discount: 0,
      received: total,
      customer_phone: customer &&  customer.customer_phone,
      status: 1,
    };

    const token = await AsyncStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `http://localhost:3003/cashier/bill/new-bill`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.error) {
        showMessage({
          message: response.data.error,
          type: "danger",
          color: "#fff",
          backgroundColor: "#5e48a6",
          icon: "info",
          duration: 3000,
        });
      }
      console.log(response.data);

      setIsModalVisible(false);
      showMessage({
        message: "Bill Paid",
        type: "success",
        color: "#fff",
        backgroundColor: "#5e48a6",
        icon: "success",
        duration: 3000,
      });
      clearBill();
      navigation.goBack();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // need to send backend when the bill is paid ,
  // customer phone number , body
  // payment method , body
  // total amount , body
  // items list in the bill , body
  // loyality points redeemed or not , body
  // asign the customer id to the bill

  const pressCancel = () => {
    showMessage({
      message: "Press and hold to cancel",
      type: "info",
      color: "#fff",
      backgroundColor: "#5e48a6",
      icon: "info",
      duration: 3000,
    });
  };

  const handledCancel = () => {
    clearBill();
    navigation.goBack();
    showMessage({
      message: "Bill Cancelled",
      type: "success",
      color: "#fff",
      backgroundColor: "#5e48a6",
      icon: "success",
      duration: 3000,
    });
  };

  const handledProceed = () => {
    if ((isRedeem && customerEligibility.eligibility) || !isRedeem) {
      if (billItems.length === 0) {
        showMessage({
          message: "No items in the bill",
          type: "danger",
          color: "#fff",
          backgroundColor: "#5e48a6",
          icon: "danger",
          duration: 3000,
        });
      } else {
        setIsModalVisible(true);
      }
    } else {
      showMessage({
        message: "Customer does not have enough points to redeem",
        type: "danger",
        color: "#fff",
        backgroundColor: "#5e48a6",
        icon: "danger",
        duration: 3000,
      });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image_url }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.item_name}</Text>
        <Text style={styles.itemPrice}>${item.discount}</Text>
      </View>
      <View style={styles.itemQuantity}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => decreaseQuantity(item.barcode.trim().toLowerCase())}
        >
          <AntDesign name="minuscircleo" size={24} color="#5e48a6" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => increaseQuantity(item.barcode.trim().toLowerCase())}
        >
          <AntDesign name="pluscircleo" size={24} color="#5e48a6" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleSliderChange = (value) => {
    setSliderValue(value);
    if (value < 0.5) {
      setPaymentMethod("cash");
    } else {
      setPaymentMethod("card");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CheckOutCustomer />
      <FlatList
        data={billItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.item_id}
        style={styles.itemsContainer}
      />
      {customer && (
        <TouchableOpacity
          onPress={() => {
            customer
              ? customerEligibility.eligibility
                ? setIsRedeem(!isRedeem)
                : showMessage({
                    message: "Customer not eligible to redeem points",
                    type: "danger",
                    color: "#fff",
                    backgroundColor: "#5e48a6",
                    icon: "danger",
                    duration: 3000,
                  })
              : showMessage({
                  message: "No customer selected",
                  type: "danger",
                  color: "#fff",
                  backgroundColor: "#5e48a6",

                  icon: "danger",
                  duration: 3000,
                });
            checkCustomerEligibility();
          }}
        >
          <View
            style={[
              styles.redeemLoyalityPoints,
              customer && customerEligibility.eligibility
                ? isRedeem && { backgroundColor: "#e3d1f9" }
                : { backgroundColor: "#ccc" },
            ]}
            disabled={
              customerEligibility.eligibility && customer ? false : true
            }
          >
            <Text
              style={[
                styles.redeemLoyalityPointsText,
                isRedeem ? { color: "#5e48a6" } : { color: "#ccc" },
              ]}
            >
              Redeem Loyalty Points
            </Text>
            <FontAwesome
              name="gift"
              size={24}
              color={isRedeem ? "#5e48a6" : "#ccc"}
            />
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.billDetailsContainer}>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Total</Text>
          <Text style={styles.billValue}>${total}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.proceedButton]}
          onPress={handledProceed}
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onLongPress={handledCancel}
          onPress={pressCancel}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>

      {/* Modal for Payment Method */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {isPaymentMethodSelected ? (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Bill Summary</Text>
              <View style={styles.billDetailsContainer}>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Total</Text>
                  <Text>${total}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Payment Method</Text>
                  <Text>
                    {paymentMethod === "cash" ? "Cash" : "Debit/Credit Card"}
                  </Text>
                </View>
                <View style={styles.billRow}>
                  {isRedeem && (
                    <Text style={styles.billLabel}>
                      {" "}
                      Loyalty Points Redeemed
                    </Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  sendBillDetails();
                }}
              >
                <Text style={styles.modalButtonText}>Pay</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Payment Method</Text>
              <Picker
                selectedValue={paymentMethod}
                onValueChange={(itemValue) => setPaymentMethod(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Cash" value="cash" />
                <Picker.Item label="Debit/Credit Card" value="card" />
              </Picker>
              <Text style={styles.sliderLabel}>
                Slide to select payment method
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setIsPaymentMethodSelected(true);
                  showMessage({
                    message: `Payment Method Selected: ${
                      paymentMethod === "cash" ? "Cash" : "Debit/Credit Card"
                    }`,
                    type: "success",
                    color: "#fff",
                    backgroundColor: "#5e48a6",
                    icon: "success",
                    duration: 3000,
                  });
                }}
              >
                <Text style={styles.modalButtonText}>
                  {" "}
                  {isPaymentMethodSelected
                    ? "confim"
                    : paymentMethod === "cash"
                    ? "Cash"
                    : "Debit/Credit Card"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  itemsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  item: {
    flexDirection: "row",
    padding: 15,
    borderWidth: 1,
    borderColor: "#5e48a6",
    alignItems: "center",
    borderRadius: 15,
    width: "95%",
    marginVertical: 5,
    marginHorizontal: "auto",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5e48a6",
  },
  itemPrice: {
    fontSize: 14,
    color: "#5e48a6",
    marginTop: 5,
  },
  itemQuantity: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  billDetailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#5e48a6",
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  billLabel: {
    fontSize: 16,
    color: "#555",
  },
  billValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#5e48a6",
    height: 100,
    padding: 5,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 15,
    margin: 5,
  },
  proceedButton: {
    backgroundColor: "#5e48a6",
  },
  cancelButton: {
    backgroundColor: "purple",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  redeemLoyalityPoints: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
  },
  redeemLoyalityPointsText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabel: {
    fontSize: 18,
    marginVertical: 20,
  },
  modalButton: {
    backgroundColor: "#5e48a6",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    width: "100%",
  },
});

export default Checkout;
