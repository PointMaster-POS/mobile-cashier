import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BillItem from './billitem';

const BillContent = ({ items, increaseQuantity, decreaseQuantity }) => {
    const [billItems, setBillItems] = useState(items.bill);

    useEffect(() => {
        setBillItems(items.bill);
    }, [items.i, items.bill]);

    return (
        <View style={styles.billContainer}>
            <View style={styles.billHeaderContainer}>
                <Text style={styles.header}>Bill Content</Text>
                {billItems.length > 0 && (
                    <Text style={styles.totalText}>
                        Total: Rs. {billItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                    </Text>
                )}
            </View>
            <ScrollView style={styles.outerItems}>
                {billItems.map((item, index) => (
                    <BillItem
                        key={index}
                        item={item}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    billContainer: {
        height: '80%',
        width: '100%',
    },
    billHeaderContainer: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    outerItems: {
        width: '100%',
        height: '100%',
    },
});

export default BillContent;
