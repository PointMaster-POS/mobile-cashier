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
import { cashierUrl } from "../../apiurl";

const Menu = () => {
  const navigation = useNavigation();

  // Get the bill items, categories, selected category and setCategories from the context
  const {
    billItems,
    setCategories,
    categories,
    selectedCategory,
    setSelectedCategory,
  } = useContext(BillContext);

  //state to store items related to the selected category
  const [items, setItems] = useState([]);

  // ----------------- Fetch Items -----------------
  const fetchItems = async () => {
    const getToken = await AsyncStorage.getItem("accessToken");
    //fetch items from the server
    try {
      const url = cashierUrl;
      const response = await axios.get(
        `${url}/cashier/inventory/products/${selectedCategory}`,
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

  // ----------------- Fetch Categories -----------------
  const fetchCategories = async () => {
    const getToken = await AsyncStorage.getItem("accessToken");
    //fetch categories from the server
    try {
      console.log("fetching categories");
      const url = cashierUrl;
      const response = await axios.get(`${url}/cashier/inventory/categories`, {
        headers: {
          contentType: "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });
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

  // ----------------- Render Category -----------------

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

  // ----------------- Render Item -----------------
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

      billItems.find(
        (billItem) =>
          billItem.barcode.trim().toLowerCase() ===
          item.barcode.trim().toLowerCase()
      ) ? (
        <MenuItem
          item={billItems.find(
            (billItem) =>
              billItem.barcode.trim().toLowerCase() ===
              item.barcode.trim().toLowerCase()
          )}
        />
      ) : (
        <InitialMenuItem item={item} />
      )
    );
  };

  // ----------------- Render -----------------
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories?.map((category) => renderCategory(category))}
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

// ----------------- Styles -----------------
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

export default Menu;
