import React,{useContext} from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { FontAwesome, AntDesign } from "react-native-vector-icons";
import CheckOutCustomer from "../components/checkout-customer";
import { BillContext } from "../../context/billcontext";

const Checkout = () => {

const {billItems} = useContext(BillContext);
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
  

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <View style={styles.itemQuantity}>
        <TouchableOpacity style={styles.quantityButton}>
          <AntDesign name="minuscircleo" size={16} color="#555" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton}>
          <AntDesign name="pluscircleo" size={16} color="#555" />
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
      <View style={styles.billDetailsContainer}>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Subtotal</Text>
          <Text style={styles.billValue}>$28</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Tax</Text>
          <Text style={styles.billValue}>$1.50</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Total</Text>
          <Text style={styles.billValue}>$29.50</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.proceedButton]}
          onPress={() => alert("Proceed button pressed")}
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => alert("Cancel button pressed")}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  // customerContainer: {
  //     padding: 20,
  //     backgroundColor: '#fff',
  //     borderBottomWidth: 1,
  //     borderColor: '#eee',
  // },
  // customerText: {
  //     fontSize: 18,
  //     fontWeight: 'bold',
  // },
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
    borderColor: "purple",
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
  },
  itemPrice: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  itemQuantity: {
    flexDirection: "row",
    alignItems: "center",
  },

  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  billDetailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
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
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
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
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
