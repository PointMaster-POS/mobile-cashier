import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView

} from 'react-native';
import BillItem from './billitem';

const BillItems = [
    {
        name: 'Chiken Burger',
        imageUrl: 'https://png.pngtree.com/png-vector/20231016/ourmid/pngtree-burger-food-png-free-download-png-image_10199386.png',
        price: 100,
    },
    {
        name: 'cappuccino',
        imageUrl: 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTuDKXbkn3GeIZJJOodadOiGxwsCP6KWCRAvtBCf_eFNowUrFmuaNz7j5UrV7K7nHgr',
        price: 200,
    },
    {
        name: 'sandwich',
        imageUrl: 'https://png.pngtree.com/png-vector/20231016/ourmid/pngtree-burger-food-png-free-download-png-image_10199386.png',
        price: 300,
    }
   
];

const BillContent = () => {
    //item list for bill
    const [billItems, setBillItems] = useState([]);

    useEffect(() => {
        setBillItems(BillItems);
    }, []);

   
   
    return(
        <View style = {Styles.billContainer}> 
            <Text style = {Styles.header}>Bill Content</Text>
            <ScrollView style = {Styles.outerItems}>
                {billItems.map((item, index) => (
                    <BillItem key = {index} item = {item} />
                ))}
            </ScrollView>
        </View>

    );
}

const Styles = StyleSheet.create({
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