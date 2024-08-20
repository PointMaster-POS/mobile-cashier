import React, { createContext, useEffect, useState } from "react";

export const BillContext = createContext();
const categoriesAll = [
  "Favorite",
  "Hot Drink",
  "Food",
  "Soft Drink",
  "Alcohol",
];
const BillItems = [
  {
    qr: "123456789",
    name: "Coca Cola",
    category: "Soft Drink",
    price: 2.5,
  },
  {
    qr: "987654321",
    name: "Fanta",
    category: "Soft Drink",
    price: 2.5,
  },
  {
    qr: "123123123",
    name: "Sprite",
    category: "Hot Drink",
    price: 2.5,
  },
  {
    qr: "321321321",
    name: "Pepsi",
    category: "Soft Drink",
    price: 2.5,
  },
];

export const BillProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [billItems, setBillItems] = useState([]);
  const [i, setI] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setBillItems(BillItems);
    setCategories(categoriesAll);
  }, []);

  const addProductToBill = (item) => {
    const qrCode = item?.qr?.trim().toLowerCase();
    if (!qrCode) return;

    const existingItem = billItems.find(
      (billItem) => billItem.qr.trim().toLowerCase() === qrCode
    );

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
    setTotal(
      billItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    console.log("total" + total);
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
    setI(i + 1);
    setTotal(
      billItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    console.log("total" + total);
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
    setI(i - 1);
    //calculate total and set
    setTotal(
      billItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    console.log("total" + total);
  };

  return (
    <BillContext.Provider
      value={{
        total,
        categories,
        billItems,
        addProductToBill,
        increaseQuantity,
        decreaseQuantity,
        i,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};
