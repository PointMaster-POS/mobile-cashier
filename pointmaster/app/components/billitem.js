import React from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { FontAwesome, AntDesign } from "react-native-vector-icons";
import { getColor } from "../../utils/colorprovider";
const BillItem = ({ item }) => {
  console.log(item);
  return (
    <View style={Styles.itemContainer}>
      <View style={Styles.imageDetailContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: 70, height: 70, borderRadius: 10, marginRight: 10 }}
          resizeMode="cover"
        />
        <View style={Styles.detailContainer}>
          <Text style={Styles.itemName}>{item.name}</Text>
          <Text style={Styles.itemPrice}>Rs. {item.price}</Text>
        </View>
      </View>
      <View style={Styles.quantityContainer}>
        <AntDesign
          name="minuscircleo"
          size={24}
          color="black"
          style={{
            color: getColor("secondary"),
          }}
        />

        <Text style={Styles.quantityText}>1</Text>

        <AntDesign
          name="pluscircleo"
          size={24}
          color="black"
          style={{
            color: getColor("secondary"),
          }}
        />
      </View>
    </View>
  );
};

export default BillItem;

const Styles = StyleSheet.create({
  quantityText: {
    fontSize: 20,
    fontWeight: "normal",
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
  },
  imageDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    justifyContent: "left",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,

    borderWidth: 1,
    borderColor: getColor("primary"),
    borderRadius: 10,
    margin: 10,
  },
  itemName: {
    fontSize: 20,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
