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
  const [discount, setDiscount] = useState(0);

  // Calculate total and discount whenever billItems change
  useEffect(() => {
    const newTotal = billItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
    
    const newDiscount = billItems.reduce(
      (acc, item) => acc + item.discount * item.quantity,
      0
    );
    setDiscount(newDiscount);

    console.log("Updated total: ", newTotal);
    console.log("Updated discount: ", newDiscount);
  }, [billItems]);

  // ----------------- Add Product to Bill -----------------
  const addProductToBill = (item) => {
    const qrCode = item?.barcode?.trim().toLowerCase();
    if (!qrCode) return;

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
  };

  // ----------------- Increase Quantity -----------------
  const increaseQuantity = (barcode) => {
    const qrCode = barcode?.trim().toLowerCase();
    if (!qrCode) return;

    const updatedItems = billItems.map((billItem) => {
      if (billItem.barcode.trim().toLowerCase() === qrCode) {
        return { ...billItem, quantity: billItem.quantity + 1 };
      }
      return billItem;
    });
    setBillItems(updatedItems);
    setI(i + 1);
  };

  // ----------------- Decrease Quantity -----------------
  const decreaseQuantity = (barcode) => {
    const qrCode = barcode?.trim().toLowerCase();
    if (!qrCode) return;

    const updatedItems = billItems
      .filter((billItem) => {
        if (billItem.barcode.trim().toLowerCase() === qrCode && billItem.quantity === 1) {
          return false;
        }
        return true;
      })
      .map((billItem) => {
        if (billItem.barcode.trim().toLowerCase() === qrCode) {
          return { ...billItem, quantity: billItem.quantity - 1 };
        }
        return billItem;
      });

    setBillItems(updatedItems);
    setI(i - 1);
  };

  // ----------------- Set Item Quantity -----------------
  const setItemQuantity = (barcode, quantity) => {
    const qrCode = barcode?.trim().toLowerCase();
    if (!qrCode) return;

    const updatedItems = billItems.map((billItem) => {
      if (billItem.barcode.trim().toLowerCase() === qrCode) {
        return { ...billItem, quantity };
      }
      return billItem;
    });
    setBillItems(updatedItems);
    setI(i);
  };

  // ----------------- Clear Bill -----------------
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
        discount,
        isHoltBill,
        setIsHoltBill,
        selectedCategory,
        setSelectedCategory,
        setItemQuantity,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};
