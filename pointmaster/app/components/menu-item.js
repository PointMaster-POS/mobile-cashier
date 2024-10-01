import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { BillContext } from "../../context/billcontext";
import { Buffer } from "buffer";

const MenuItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity } = useContext(BillContext);
  // const [base64Image, setBase64Image] = useState("");

  // useEffect(() => {
  //   if (item.image_url && item.image_url.data) {
  //     try {
  //       const base64String = Buffer.from(item.image_url.data).toString("base64");
  //       setBase64Image(base64String);
  //     } catch (error) {
  //       console.error("Error converting image data to base64:", error);
  //     }
  //   }
  // }, [item.image_url]);

  // Debugging log
  // console.log("Base64 Image (end):", base64Image.slice(-50));
  
  return (
    <View style={styles.item}>
      
        <Image
          source={{ uri: item.image_url }} 
          style={styles.itemImage}
          resizeMode="cover" // Ensure the image covers the container
        />
   
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

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 15,
    borderWidth: 1,
    borderColor: "#5e48a6",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
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
    borderRadius: 25,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default MenuItem;
