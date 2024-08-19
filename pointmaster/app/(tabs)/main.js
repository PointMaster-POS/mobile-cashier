import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import BarcodeScanner from '../components/barcodeScanner';
import BillContent from '../components/billcontent';
import { BillContext } from '../../context/BillContext';

const Main = () => {
    const { billItems, addProductToBill, increaseQuantity, decreaseQuantity, i } = useContext(BillContext); 

    return (
        <SafeAreaView style={styles.container}>
            <BillContent items={{ bill: billItems, i: i }} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
            <BarcodeScanner addProductToBill={addProductToBill} />
        </SafeAreaView>
    );
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});
