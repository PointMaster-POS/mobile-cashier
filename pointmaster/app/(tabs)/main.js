
import BarcodeScanner from '../components/barcodeScanner';
import BillContent from '../components/billcontent';
import {SafeAreaView, Text, Button, StyleSheet, View} from 'react-native';




const Main = () => {
    return (
        <SafeAreaView style = {styles.container} >
           <BillContent />
           <BarcodeScanner />
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