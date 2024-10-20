import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BillContext } from "../../context/billcontext";

const InitialMenuItem = ({ item }) => {
  // Get the addProductToBill function from the context
  const { addProductToBill } = useContext(BillContext);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // ----------------- Display the initial menu item -----------------
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        addProductToBill(item);
        
      }}
      key={item.barcode.trim().toLowerCase()}
    >
      <Image source={{ uri: item.image_url }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.item_name}</Text>
        <Text style={styles.itemPrice}>Rs. {item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

// ----------------- Styles -----------------
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "#eee",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  itemDetails: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 24,
    color: "#5e48a6",
  },
});

export default InitialMenuItem;