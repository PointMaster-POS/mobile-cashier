import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Main from './app/(tabs)/main';
import { BillProvider } from './Context/billcontext';

export default function App() {
    return (
        <BillProvider>
            <SafeAreaView style={styles.container}>
                <Main />
            </SafeAreaView>
        </BillProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
