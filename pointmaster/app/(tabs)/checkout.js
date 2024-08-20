import React, { useContext, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { FontAwesome, AntDesign } from "react-native-vector-icons";
import CheckOutCustomer from "../components/checkout-customer";
import { BillContext } from "../../context/billcontext";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
const Checkout = () => {
    const navigation = useNavigation();
  const [isRedeem, setIsRedeem] = useState(false);

  const { billItems, total, cancelBill } = useContext(BillContext);
  const items = [
    {
      name: "Cappuccino",
      price: 8,
      quantity: 1,
      imageUrl:
        "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTuDKXbkn3GeIZJJOodadOiGxwsCP6KWCRAvtBCf_eFNowUrFmuaNz7j5UrV7K7nHgr",
    },
    {
      name: "Matcha Latte",
      price: 10,
      quantity: 2,
      imageUrl:
        "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTuDKXbkn3GeIZJJOodadOiGxwsCP6KWCRAvtBCf_eFNowUrFmuaNz7j5UrV7K7nHgr",
    },
  ];

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
    cancelBill();
    //return back in the stack
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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <View style={styles.itemQuantity}>
        <TouchableOpacity style={styles.quantityButton}>
          <AntDesign name="minuscircleo" size={24} color="#5e48a6" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton}>
          <AntDesign name="pluscircleo" size={24} color="#5e48a6" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CheckOutCustomer />
      <FlatList
        data={billItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        style={styles.itemsContainer}
      />
      <TouchableOpacity onPress={() => setIsRedeem(!isRedeem)}>
        <View
          style={[
            styles.redeemLoyalityPoints,
            isRedeem && { backgroundColor: "#e3d1f9" },
          ]}
        >
          <Text
            style={[
              styles.redeemLoyalityPointsText,
              isRedeem ? { color: "#5e48a6" } : { color: "#ccc" },
            ]}
          >
            Redeem Loyality Points
          </Text>
          <FontAwesome
            name="gift"
            size={24}
            color={isRedeem ? "#5e48a6" : "#ccc"}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.billDetailsContainer}>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Total</Text>
          <Text style={styles.billValue}>${total}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.proceedButton]}
          onPress={() => alert("Proceed button pressed")}
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
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  
  tableText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
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
  cancelButton: {
    backgroundColor: "purple",
  },
  proceedButton: {
    backgroundColor: "#5e48a6",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
