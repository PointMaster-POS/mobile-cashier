import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BillContext } from '../../context/billcontext';


const InitialMenuItem = ({ item }) => {
    const { addProductToBill } = useContext(BillContext);
    
    return (
        <TouchableOpacity
        style={styles.item}
        onPress={() => addProductToBill(item)}
        >
        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.item_name}</Text>
            <Text style={styles.itemPrice}>${item.discount}</Text>
        </View>
        </TouchableOpacity>
    );
};

export default InitialMenuItem;
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: '#eee',
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    itemDetails: {
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 24,
        color: '#5e48a6',
    },
});

    