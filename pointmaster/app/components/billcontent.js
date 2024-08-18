import {View, Text, StyleSheet} from 'react-native';

const BillContent = () => {

    const billItems = [
        {
            name: 'Item 1',
            imageUr: 'https://png.pngtree.com/png-vector/20231016/ourmid/pngtree-burger-food-png-free-download-png-image_10199386.png',
            price: 100,
        },
       
    ];
    return(
        <View style = {Styles.billContainer}> 
            <Text style = {Styles.header}>Bill Content</Text>
            <View>
                {billItems.map((item, index) => (
                    <BillItem key = {index} item = {item} />
                ))}
            </View>

        </View>

    );
}

const Styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    billContainer: {
        height: '80%',
        width: '100%',
        backgroundColor: 'lightgrey',
    },
});

export default BillContent;