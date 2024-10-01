import React, { createContext, useEffect, useState } from "react";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import axios from "axios";

export const BillContext = createContext();


export const BillProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const [billItems, setBillItems] = useState([]);
  const [i, setI] = useState(0);
  const [total, setTotal] = useState(0);
  const [customer, setCustomer] = useState(null);
  const [isHoltBill, setIsHoltBill] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();


  const addProductToBill = (item) => {
    const qrCode = item?.barcode?.trim().toLowerCase();
    if (!qrCode) return;
    //check if the item already exists in the bill
    const existingItem = billItems.find(
      (billItem) => billItem.barcode.trim().toLowerCase() === qrCode
    );

    if (existingItem) {
      const updatedItems = billItems.map((billItem) => {
        if (billItem.barcode.trim().toLowerCase() === qrCode) {
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
      billItems.reduce((acc, item) => acc + item.discount * item.quantity, 0)
    );
    console.log("total" + total);
  };

  const increaseQuantity = (barcode) => {
    const qrCode = barcode?.trim().toLowerCase();
    if (!qrCode) return;


    const updatedItems = billItems.map((billItem) => {
      if (billItem.barcode.trim().toLowerCase() === qrCode) {
        if (billItem.quantity ) {
          return { ...billItem, quantity: billItem.quantity + 1 };
        } else {
          return { ...billItem, quantity: 1 };
        }
      }
      return billItem;
    });
    setBillItems(updatedItems);
    setI(i + 1);
    setTotal(
      billItems.reduce((acc, item) => acc + item.discount * item.quantity, 0)
    );
    console.log("total" + total);
  };

  const decreaseQuantity = (barcode) => {
    const qrCode = barcode?.trim().toLowerCase();
    if (!qrCode) return;

    const updatedItems = billItems.map((billItem) => {
      if (billItem.barcode.trim().toLowerCase() === qrCode) {
        if (billItem.quantity === 1) {
          return billItem;
        } else {

        return { ...billItem, quantity: Math.max(billItem.quantity - 1, 1) };
        }
      }
      return billItem;
    });
    setBillItems(updatedItems);
    setI(i - 1);
    //calculate total and set
    setTotal(
      billItems.reduce((acc, item) => acc + item.discount * item.quantity?item.quantity: 0 , 0)
    );
    console.log("total" + total);
  };

  const clearBill = () => {
    setCustomer(null);
    setBillItems([]);
    setTotal(0);
    setI(0);
  };

  return (
    <BillContext.Provider
      value={{
        total,
        categories,
        billItems,
        setCategories,
        addProductToBill,
        increaseQuantity,
        decreaseQuantity,
        clearBill,
        customer,
        setCustomer,
        setBillItems,
        i,
        isHoltBill,
        setIsHoltBill,  
        selectedCategory, 
        setSelectedCategory

      }}
    >
      {children}
    </BillContext.Provider>
  );
};
