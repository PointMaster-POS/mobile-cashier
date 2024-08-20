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
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg/190px-15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg",
    price: 2.5,
  },
  {
    qr: "987654321",
    name: "Fanta",
    category: "Soft Drink",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg/190px-15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg",

    price: 2.5,
  },
  {
    qr: "123123123",
    name: "Sprite",
    category: "Hot Drink",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg/190px-15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg",

    price: 2.5,
  },
  {
    qr: "321321321",
    name: "Pepsi",
    category: "Soft Drink",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg/190px-15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg",

    price: 2.5,
  },
];

export const BillProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [billItems, setBillItems] = useState([]);
  const [i, setI] = useState(0);
  const [total, setTotal] = useState(0);


  useEffect(() => { 
    setCategories(categoriesAll);
  }, []);

  

  const addProductToBill = (item) => {
    const qrCode = item?.qr?.trim().toLowerCase();
    if (!qrCode) return;
    //check if the item already exists in the bill
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
      billItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    console.log("total" + total);
  };

  const decreaseQuantity = (qr) => {
    const qrCode = qr?.trim().toLowerCase();
    if (!qrCode) return;

    const updatedItems = billItems.map((billItem) => {
      if (billItem.qr.trim().toLowerCase() === qrCode) {
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
      billItems.reduce((acc, item) => acc + item.price * item.quantity?item.quantity: 0 , 0)
    );
    console.log("total" + total);
  };

  const cancelBill = () => {
    setBillItems([]);
    setTotal(0);
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
        cancelBill,
        i,

      }}
    >
      {children}
    </BillContext.Provider>
  );
};
