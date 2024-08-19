import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const CheckOutCustomer = () => {

    return (
        <View style={styles.mainCustomerContainer}>
        <View style={styles.customerContainer}>
        <Text style={styles.customerText}>Customer: Ever</Text>
        <Text style={styles.tableText}>Table: Outside, 7</Text>
        </View>
        <View style={styles.editButtonContainer}>
        <Text style={styles.editButtonText}>Edit</Text>
        </View>

        </View>
    )
};

export default CheckOutCustomer;

const styles = StyleSheet.create({
    customerContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    customerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    tableText: {
        fontSize: 16,
    },
    mainCustomerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    editButtonContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
});