import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const Menu = () => {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState('Favorite');

    const _handlePressButtonAsync = async () => {
        navigation.navigate("Checkout");
      };

    const categories = ['Favorite', 'Hot Drink', 'Food', 'Soft Drink', 'Alcohol'];
    const items = [
        { name: 'Cappuccino', price: 8, imageUrl: 'https://example.com/cappuccino.jpg', category: 'Favorite' },
        { name: 'Matcha Latte', price: 10, imageUrl: 'https://example.com/matcha-latte.jpg', category: 'Favorite' },
        { name: 'Iced Coffee', price: 8, imageUrl: 'https://example.com/iced-coffee.jpg', category: 'Soft Drink' },
        { name: 'Fruit Smoothies', price: 7, imageUrl: 'https://example.com/fruit-smoothies.jpg', category: 'Soft Drink' },
        { name: 'Chicken Burger', price: 12, imageUrl: 'https://example.com/chicken-burger.jpg', category: 'Food' },
    ];

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

    const renderItem = ({ item }) => (
        item.category === selectedCategory && (
            <View style={styles.item}>
                <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                </View>
                <View style={styles.itemQuantity}>
                    <TouchableOpacity style={styles.quantityButton}>
                        <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>1</Text>
                    <TouchableOpacity style={styles.quantityButton}>
                        <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.categoriesContainer}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.categoriesContainer}
            style={styles.categoriesContainer}>
                {categories.map(renderCategory)}
            </ScrollView>
            </View>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.name}
                style={styles.itemsContainer}
            />
            <TouchableOpacity style={styles.orderButton} onPress = {_handlePressButtonAsync}>
                <Text style={styles.orderButtonText}>Proceed New Order</Text>
                <Text style={styles.orderButtonText}>3 Items $28</Text>
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
        height: 100,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    categoryButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderRadius: 20,
        height: 50,
        justifyContent: 'center',
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
