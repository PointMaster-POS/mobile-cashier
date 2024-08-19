import BarcodeScanner from '../components/barcodeScanner';
import BillContent from '../components/billcontent';
import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';



const Main = () => {

    const [i, setI] = useState(0);
    const BillItems = [
        {
            name: 'Chicken Burger',
            imageUrl: 'https://png.pngtree.com/png-vector/20231016/ourmid/pngtree-burger-food-png-free-download-png-image_10199386.png',
            price: 100,
            qr: 'chic-bur',
        },
        {
            name: 'Cappuccino',
            imageUrl: 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTuDKXbkn3GeIZJJOodadOiGxwsCP6KWCRAvtBCf_eFNowUrFmuaNz7j5UrV7K7nHgr',
            price: 200,
            qr: 'cap',
        },
        {
            name: 'Sandwich',
            imageUrl: 'https://png.pngtree.com/png-vector/20231016/ourmid/pngtree-burger-food-png-free-download-png-image_10199386.png',
            price: 300,
            qr: 'sand',
        }
    ];
    const [billItems, setBillItems] = useState([]);

    const addProductToBill = (qr) => {
        console.log('Scanned QR:', qr);
    
        const item = BillItems.find((item) => item.qr.trim().toLowerCase() === qr.trim().toLowerCase());
        console.log('Found Item:', item);
    
        if (item) {
            console.log('bill items:', billItems);
            const existingItem = billItems.find((billItem) => {
                console.log('Checking Item:', billItem.qr);
                return billItem.qr.trim().toLowerCase() === qr.trim().toLowerCase();
            });
            console.log('Existing Item:', existingItem);
            if (existingItem) {
                console.log('Existing Item Found:', existingItem);
            
                const updatedItems = billItems.map((billItem) => {
                    if (billItem.qr.trim().toLowerCase() === qr.trim().toLowerCase()) {
                        console.log('Updating Item:', billItem);
                        return {
                            ...billItem,
                            quantity: billItem.quantity + 1,
                        };
                    }
                    return billItem;
                });
            
                console.log('Updated Items:', updatedItems);
                setBillItems(updatedItems);
                setI(i+1);
            } else {
                console.log('Adding New Item:', item);
                const newItem = {
                    ...item,
                    quantity: 1,
                };
                setBillItems([...billItems, newItem]);
                setI(i+1);
            }
        } else {
            alert('Item not found');
        }
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <BillContent items={billItems} i = {i} />
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

    billContainer: {
        height: '50%',
        width: '100%',
        backgroundColor: 'lightgrey',
    },
});