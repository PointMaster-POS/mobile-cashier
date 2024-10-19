import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { BillContext } from "../../context/billcontext";
import { AntDesign } from "react-native-vector-icons";

const CheckOutButton = () => {
  // navigation to checkout page
  const navigation = useNavigation();

  // get the total and number of items from the context
  const { total, i } = useContext(BillContext);

  // ----------------- Handle the navigation to the checkout page -----------------
  const handledAsyncNavigation = async () => {
    navigation.navigate("Checkout");
  };
  return (
    <View style={styles.orderButtonContainer}>
      <TouchableOpacity
        style={styles.orderButton}
        onPress={handledAsyncNavigation}
      >
        <Text style={styles.orderButtonText}>Proceed New Order</Text>
        <Text style={styles.orderButtonText}>
          {i} Items Rs. {total}
        </Text>
        <AntDesign name="right" size={24} color="#e3d1f9" />
      </TouchableOpacity>
    </View>
  );
};

// ----------------- Styles -----------------   
const styles = StyleSheet.create({
  orderButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  orderButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#5e48a6",
    borderRadius: 50,
    width: "90%",
  },
  orderButtonText: {
    color: "#e3d1f9",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CheckOutButton;
