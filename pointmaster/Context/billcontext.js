import React, { createContext, useState } from 'react';

export const BillContext = createContext();

export const BillProvider = ({ children }) => {
    const [billItems, setBillItems] = useState([]);

    const addProductToBill = (qr) => {
        const item = BillItems.find((item) => item.qr === qr);
        if (item) {
            const existingItem = billItems.find((billItem) => billItem.qr === qr);

            if (existingItem) {
                const updatedItems = billItems.map((billItem) => {
                    if (billItem.qr === qr) {
                        return {
                            ...billItem,
                            quantity: billItem.quantity + 1,
                        };
                    }
                    return billItem;
                });

                setBillItems(updatedItems);
            } else {
                const newItem = {
                    ...item,
                    quantity: 1,
                };
                setBillItems([...billItems, newItem]);
            }
        } else {
            alert('Item not found');
        }
    };

    return (
        <BillContext.Provider value={{ billItems, addProductToBill }}>
            {children}
        </BillContext.Provider>
    );
};
