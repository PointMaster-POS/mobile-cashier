import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {AntDesign} from 'react-native-vector-icons';
import { useContext } from "react";
import { BillContext } from "../../context/billcontext";

const MenuItem = ({ item }) => {
    const { increaseQuantity, decreaseQuantity, i } = useContext(BillContext);

    
   // console.log("item" + item);
   console.log("wu" + item.quantity);
  return (

    <View style={styles.item}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
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
      </View>
      <Text style={styles.quantityText}>{item.quantity}</Text>
      
      
      <View style={styles.itemQuantity}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => increaseQuantity(item.barcode.trim().toLowerCase())}
        >
            <AntDesign name="pluscircleo" size={24} color="#5e48a6" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 15,
    borderWidth : 1,
    borderColor: "#eee",
    alignItems: "center",
    marginHorizontal:10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "#5e48a6",
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
  quantityButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});
