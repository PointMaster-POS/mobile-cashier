import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { BillContext } from '../../context/BillContext'; 
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
    const navigation = useNavigation();
    //get state from bill context
   
    const { billItems, increaseQuantity, decreaseQuantity,categories, i } = useContext(BillContext); 
    const [selectedCategory, setSelectedCategory] = useState('Favorite');


    const handledAsyncNavigation = async () => {
        navigation.navigate('Checkout');
    };
    console.log(billItems);
    console.log(categories);
    //render category buttons to the screen

    const renderCategory = (category) => (
        <TouchableOpacity 
            key={category} 
            style={[
                styles.categoryButton, 
                selectedCategory === category && styles.categoryButtonSelected
            ]}
            onPress={() => setSelectedCategory(category)}
        >
            <Text style={styles.categoryButtonText}>{category}</Text>
        </TouchableOpacity>
    );

    //render category items to the screen

    const renderItem = ({ item }) => (
        item.category === selectedCategory && (
            <View style={styles.item}>
                <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                <View style={styles.itemQuantity}>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(item.qr.trim().toLowerCase())}>
                        <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                </View>
                <View style={styles.itemQuantity}>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(item.qr.trim().toLowerCase())}>
                        <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.categoriesContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
                    {categories.map(renderCategory)}
                </ScrollView>
            </View>
            <FlatList
                data={billItems}
                renderItem={renderItem}
                keyExtractor={item => item.name}
                style={styles.itemsContainer}
            />
            <TouchableOpacity style={styles.orderButton} onPress = {handledAsyncNavigation}>
                <Text style={styles.orderButtonText}>Proceed New Order</Text>
                <Text style={styles.orderButtonText}>{i} Items ${billItems.reduce((total, item) => total + item.price * item.quantity, 0)}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    categoryButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#eee',
    },
    categoryButtonSelected: {
        backgroundColor: '#e3d1f9',
        borderColor: '#5e48a6',
        borderWidth: 1,
    },
    categoryButtonText: {
        fontSize: 16,
        color: '#5e48a6',
    },
    itemsContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
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
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    itemQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 5,
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    orderButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#5e48a6',
        borderRadius: 30,
        margin: 20,
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});