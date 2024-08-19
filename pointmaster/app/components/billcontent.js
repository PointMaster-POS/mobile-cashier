import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView

} from 'react-native';
import BillItem from './billitem';


const BillContent = (items) => {
    //item list for bill
    const [billItems, setBillItems] = useState(items);
  

    // useEffect(() => {
    //     setBillItems();
    // }, []);

    //add product to bill
    // const addProductToBill = (qr) => {
    //     const item = BillItems.find((item) => item.qr === qr);
    //     if (item) {
    //         setBillItems([...billItems, item]);
    //     }
    // };
   
    useEffect(() => {
        setBillItems(items.items.bill);
        console.log("iiii", items.items.i);
        
    }, [items.items.i]);
   
    
   
    return(
        <View style = {Styles.billContainer}> 
            <View style = {Styles.billHeaderContainer}>
            <Text style = {Styles.header}>Bill Content </Text>
            {billItems?.length > 0 && <Text> Total: {billItems.reduce((acc, item) => acc + item.price* item.quantity, 0)} </Text>}
            </View>
            <ScrollView style = {Styles.outerItems}>
                { billItems.map((item, index) => (
                    <BillItem key = {index} item = {item} /> 
                ))}
            </ScrollView>
        </View>

    );
}

const Styles = StyleSheet.create({
    billHeaderContainer: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    outerItems: {
        width: '100%',
        height: '100%',
        
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    billContainer: {
        height: '80%',
        width: '100%',
      
    },
});

export default BillContent;