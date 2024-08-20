import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { getColor } from "../../utils/colorprovider";

const BillItem = ({ item, increaseQuantity, decreaseQuantity }) => {
    const [quantity, setQuantity] = useState(item.quantity);

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
        <View style={styles.itemContainer}>
            <View style={styles.imageDetailContainer}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.itemImage}
                    resizeMode="cover"
                />
                <View style={styles.detailContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>Rs. {item.price * quantity}</Text>
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

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderWidth: 1,
        borderColor:"#5e48a6",
        backgroundColor: "#e3d1f9",
        borderRadius: 10,
        margin: 10,
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
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 10,
    },
    itemName: {
        fontSize: 18,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: "bold",
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
