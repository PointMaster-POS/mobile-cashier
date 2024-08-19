import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Checkout from './app/(tabs)/checkout';
import Menu from './app/(tabs)/menu';


export default function App() {
    return (
   
            <SafeAreaView style={styles.container}>
                <Menu />
            </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
