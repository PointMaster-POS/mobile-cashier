
import BarcodeScanner from '../components/barcodeScanner';
import BillContent from '../components/billcontent';
import {SafeAreaView, Text, Button, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';

const BillItems = [
    {
        name: 'Chiken Burger',
        imageUrl: 'https://png.pngtree.com/png-vector/20231016/ourmid/pngtree-burger-food-png-free-download-png-image_10199386.png',
        price: 100,
        quantity: 1,
        qr : 'chic-bur',
    },
    {
        name: 'cappuccino',
        imageUrl: 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTuDKXbkn3GeIZJJOodadOiGxwsCP6KWCRAvtBCf_eFNowUrFmuaNz7j5UrV7K7nHgr',
        price: 200,
        quantity: 1,
        qr : 'cap',
    },
    {
        name: 'sandwich',
        imageUrl: 'https://png.pngtree.com/png-vector/20231016/ourmid/pngtree-burger-food-png-free-download-png-image_10199386.png',
        price: 300,
        quantity: 1,
        qr : 'sand',
    }
   
];



const Main = () => {
    const [billItems, setBillItems] = useState([]);


    const addProductToBill = (qr) => {

        //need to fetch the item from the qr code (note)
        const item = BillItems.find((item) => item.qr === qr);
        if (item) {
            //check if the item is already in the bill
            const existingItem = billItems.find((billItem) => billItem.qr === qr);
            if (existingItem) {
                //increase the quantity of the existing item
                
                const newItems = billItems.map((billItem) => {
                    if (billItem.qr === qr) {
                        return {
                            ...billItem,
                            quantity: billItem.quantity + 1,
                        };
                    }
                    return billItem;
                });
                setBillItems(newItems);
            } else {
                //add the item to the bill
                setBillItems([...billItems, item]);
            }
            
            
        }
        console.log(item);
    } 

    

    
   
    
    // useEffect(() => {
    //     setBillItems(BillItems);
    // }, []);

    return (
        <SafeAreaView style = {styles.container} >
           <BillContent items = {billItems} />
           <BarcodeScanner  addProductToBill = {addProductToBill} />
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

    billContainer: {
        height: '50%',
        width: '100%',
        backgroundColor: 'lightgrey',
    },
});