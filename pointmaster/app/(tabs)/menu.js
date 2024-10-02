import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { BillContext } from "../../context/billcontext";
import { useNavigation } from "@react-navigation/native";
import CheckOutButton from "../components/checkout-button";
import MenuItem from "../components/menu-item";
import InitialMenuItem from "../components/initialmenuitem";

//nedd to fetach all the items related to selected category
// const MenuItems = [
//   {
//     qr: "123456789",
//     name: "Coca Cola",
//     category: "Soft Drink",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg/190px-15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg",
//     price: 2.5,
//   },
//   {
//     qr: "987654321",
//     name: "Fanta",
//     category: "Soft Drink",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg/190px-15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg",

//     price: 2.5,
//   },
//   {
//     qr: "123123123",
//     name: "Sprite",
//     category: "Hot Drink",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg/190px-15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg",

//     price: 2.5,
//   },
//   {
//     qr: "321321321",
//     name: "Pepsi",
//     category: "Soft Drink",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg/190px-15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg",

//     price: 2.5,
//   },
// ];

const Menu = () => {
  const navigation = useNavigation();
  //get state from bill context

  //   [
  //     {
  //         "category_id": "2076ef49-7188-11ef-8928-0242ac120002",
  //         "branch_id": "20578700-7188-11ef-8928-0242ac120002",
  //         "category_name": "Electronics",
  //         "category_location": "Aisle 1"
  //     }
  // ]

  const { billItems, setCategories, categories ,selectedCategory, setSelectedCategory} = useContext(BillContext);
 
  const [items, setItems] = useState([]);

  //fetach items related to the selected category
  const fetchItems = async () => {
    const getToken = await AsyncStorage.getItem("accessToken");
    //fetch items from the server
    try {
      const response = await axios.get(
        `http://192.168.1.109:3003/cashier/inventory/products/${selectedCategory}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    //call fetchItems function
    console.log(selectedCategory);
    fetchItems();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    const getToken = await AsyncStorage.getItem("accessToken");
    //fetch categories from the server
    try {
      console.log("fetching categories");
      const response = await axios.get(
        "http://192.168.1.109:3003/cashier/inventory/categories",
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setCategories(response.data);
      setSelectedCategory(response.data[0].category_id);
    } catch (error) {
      console.error("Error:", error.message);
    }
   
  };

  useEffect(() => {
    //call fetchCategories function
    
    fetchCategories();
  }, []);

  //render category buttons to the screen

  const renderCategory = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.categoryButtonSelected,
      ]}
      onPress={() => setSelectedCategory(category.category_id)}
    >
      <Text style={styles.categoryButtonText}>{category.category_name}</Text>
    </TouchableOpacity>
  );

  //render category items to the screen

  const renderItem = ({ item }) => {
    return (
    //   selectedCategory === item.category &&
    //   (billItems.find(
    //     (billItem) =>
    //       billItem.qr.trim().toLowerCase() === item.qr.trim().toLowerCase()
    //   ) ? (
    //     <MenuItem
    //       item={billItems.find(
    //         (billItem) =>
    //           billItem.qr.trim().toLowerCase() === item.qr.trim().toLowerCase()
    //       )}
    //     />
    //   ) : (
    //     <InitialMenuItem item={item} />
    //   ))
    // );

    //need to fetch all the items related to selected category from backend 

    (billItems.find(
      (billItem) =>
        billItem.barcode.trim().toLowerCase() === item.barcode.trim().toLowerCase()
    ) ? (
      <MenuItem
        item={billItems.find(
          (billItem) =>
            billItem.barcode.trim().toLowerCase() === item.barcode.trim().toLowerCase()
        )}
      />
    ) : (
      <InitialMenuItem item={item} />
    ))

    )
 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories?.map((category) =>
            renderCategory(category)
          )}
        </ScrollView>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        style={styles.itemsContainer}
      />
      <CheckOutButton />
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,

    backgroundColor: "#fff",
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 15,
    height: 70,
    justifyContent: "center",
    backgroundColor: "#eee",
  },
  categoryButtonSelected: {
    backgroundColor: "#e3d1f9",
    borderColor: "#5e48a6",
    borderWidth: 1,
  },
  categoryButtonText: {
    fontSize: 16,
    color: "#5e48a6",
  },
});
