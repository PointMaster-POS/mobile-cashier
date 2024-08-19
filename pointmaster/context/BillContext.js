import React, { createContext, useEffect, useState } from 'react';

export const BillContext = createContext();

const BillItems = [
    {
        qr: '123456789',
        name: 'Coca Cola',
        price: 2.5,
        quantity: 1,
    },
    {
        qr: '987654321',
        name: 'Fanta',
        price: 2.5,
        quantity: 1,
    },
    {
        qr: '123123123',
        name: 'Sprite',
        price: 2.5,
        quantity: 1,
    },
    {
        qr: '321321321',
        name: 'Pepsi',
        price: 2.5,
        quantity: 1,
    },
];

export const BillProvider = ({ children }) => {
    const [billItems, setBillItems] = useState([]);
    const [i, setI] = useState(0);

    useEffect(() => {
        setBillItems(BillItems);
    }, []);

    const addProductToBill = (item) => {
        const qrCode = item?.qr?.trim().toLowerCase();
        if (!qrCode) return;

        const existingItem = billItems.find((billItem) => billItem.qr.trim().toLowerCase() === qrCode);

        if (existingItem) {
            const updatedItems = billItems.map((billItem) => {
                if (billItem.qr.trim().toLowerCase() === qrCode) {
                    return { ...billItem, quantity: billItem.quantity + 1 };
                }
                return billItem;
            });
            setBillItems(updatedItems);
        } else {
            const newItem = { ...item, quantity: 1 };
            setBillItems([...billItems, newItem]);
        }
        setI(i + 1);
    };

    const increaseQuantity = (qr) => {
        const qrCode = qr?.trim().toLowerCase();
        if (!qrCode) return;

        const updatedItems = billItems.map((billItem) => {
            if (billItem.qr.trim().toLowerCase() === qrCode) {
                return { ...billItem, quantity: billItem.quantity + 1 };
            }
            return billItem;
        });
        setBillItems(updatedItems);
    };

    const decreaseQuantity = (qr) => {
        const qrCode = qr?.trim().toLowerCase();
        if (!qrCode) return;

        const updatedItems = billItems.map((billItem) => {
            if (billItem.qr.trim().toLowerCase() === qrCode) {
                return { ...billItem, quantity: Math.max(billItem.quantity - 1, 1) };
            }
            return billItem;
        });
        setBillItems(updatedItems);
    };

    return (
        <BillContext.Provider value={{ billItems, addProductToBill, increaseQuantity, decreaseQuantity, i }}>
            {children}
        </BillContext.Provider>
    );
};
