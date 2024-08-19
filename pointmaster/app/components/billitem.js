import React , {useState, useEffect} from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { FontAwesome, AntDesign } from "react-native-vector-icons";
import { getColor } from "../../utils/colorprovider";
const BillItem = ({ item , increaseQuantity, decreaseQuantity}) => {
    //create state to handle quantity
    const [quantity, setQuantity] = useState(item.quantity);

    //increase and decrease quantity
    const handleAdd = () => {
        increaseQuantity(item.qr.trim().toLowerCase());
    };
    const handleMinus = () => {
        if (quantity > 1) {
            decreaseQuantity(item.qr.trim().toLowerCase());
        }
    };
    
    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);
  

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
          <Text style={Styles.itemPrice}>Rs. {item.price * quantity}</Text>
        </View>
      </View>
      <View style={Styles.quantityContainer}>
        <AntDesign
          name="minuscircleo"
          size={24}
          color={getColor("primary")}
          onPress={handleMinus}
        />

        <Text style={Styles.quantityText}>{quantity}</Text>

        <AntDesign
          name="pluscircleo"
          size={24}
          color={getColor("primary")}
          onPress={handleAdd}
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
    backgroundColor: getColor("light"),
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
