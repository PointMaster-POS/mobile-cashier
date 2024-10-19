import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BillItem from "./billitem";

import MenuItem from "./menu-item";
import { AntDesign } from "react-native-vector-icons";
import { BillContext } from "../../context/billcontext";

const BillContent = () => {
  // Get the bill items from the context
  const { billItems } = useContext(BillContext);

  // ----------------- Display the bill items -----------------
  return (
    <View style={styles.billContainer}>
      {/* If there are items in the bill, display them */}
      {billItems.length > 0 ? (
        <ScrollView style={styles.outerItems}>
          {billItems.map((item, index) => (
            <BillItem key={index} item={item} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={styles.header}>No items in the bill</Text>
          <AntDesign name="shoppingcart" size={100} color="#5e48a6" />
        </View>
      )}
      <View style={styles.billHeaderContainer}>
        {/* Display the total amount */}
        {billItems.length > 0 && (
          <Text style={styles.totalText}>
            Total: Rs.{" "}
            {billItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            )}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noItemsContainer: {
    display: "flex",
    flexDirection: "column",
    height: "80%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  billContainer: {
    height: "80%",
    width: "100%",
  },
  billHeaderContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  outerItems: {
    width: "100%",
    height: "100%",
  },
});

export default BillContent;
