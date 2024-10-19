import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { getColor } from "../../utils/colorprovider";
import { BillContext } from "../../context/billcontext";

const BillItem = ({ item }) => {
  // Get the quantity from the context and set it to the state
  const [quantity, setQuantity] = useState(item.quantity);
  const { increaseQuantity, decreaseQuantity } = useContext(BillContext);

  // ----------------- Increase and Decrease Quantity -----------------
  const handleAdd = () => {
    increaseQuantity(item.barcode.trim().toLowerCase());
  };

  const handleMinus = () => {
    if (quantity > 1) {
      decreaseQuantity(item.barcode.trim().toLowerCase());
    }
  };

  // ----------------- Update the quantity when it changes -----------------
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  // ----------------- Display the bill item -----------------
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageDetailContainer}>
        <Image
          source={{ uri: item.image_url }}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <View style={styles.detailContainer}>
          <Text style={styles.itemName}>{item.item_name}</Text>
          <Text style={styles.itemPrice}>Rs. {item.price * quantity}</Text>
          <Text style={styles.itemPerPrice}>Rs. {item.price}/item</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <AntDesign
          name="minuscircleo"
          size={24}
          color="#5e48a6"
          onPress={handleMinus}
        />
        <Text style={styles.quantityText}>{quantity}</Text>
        <AntDesign
          name="pluscircleo"
          size={24}
          color="#5e48a6"
          onPress={handleAdd}
        />
      </View>
    </View>
  );
};

// ----------------- Styles -----------------
const styles = StyleSheet.create({
  itemPerPrice: {
    fontSize: 12,
    color: "#5e48a6",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#5e48a6",

    borderRadius: 10,
    margin: 5,
    padding: 15,
  },
  imageDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
  },
  detailContainer: {
    justifyContent: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  itemName: {
    fontSize: 18,
    color: "#5e48a6",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5e48a6",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
    justifyContent: "space-between",
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "normal",
  },
});

export default BillItem;
