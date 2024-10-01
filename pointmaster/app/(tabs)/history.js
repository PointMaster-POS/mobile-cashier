import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useContext } from "react";
import { BillContext } from "../../context/billcontext";

// Sample bill history data including status (0: Incomplete, 1: Completed)
// const sampleData = [
//   {
//     id: '1',
//     total: 45.67,
//     phone: '123-456-7890',
//     date: '2024-09-21 14:35',
//     status: 0,
//     items: [
//       { name: "Burger", quantity: 2, image: "https://via.placeholder.com/40" },
//       { name: "Fries", quantity: 1, image: "https://via.placeholder.com/40" },
//     ],
//   },
//   {
//     id: '2',
//     total: 78.99,
//     phone: '987-654-3210',
//     date: '2024-09-20 11:22',
//     status: 1,
//     items: [
//       { name: "Pizza", quantity: 1, image: "https://via.placeholder.com/40" },
//       { name: "Coke", quantity: 2, image: "https://via.placeholder.com/40" },
//     ],
//   },

// ];

const History = ({navigation}) => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [sampleData, setSampleData] = useState([]);
  const { customer, setCustomer, setBillItems,  isHoltBill,
    setIsHoltBill } = useContext(BillContext);

  const handleContinueBill = (id) => {
    Alert.alert("Continue Bill", `Do you want to continue bill #${id}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Continue",
        onPress: () => {
          customer ? setCustomer(null) : null;
          setBillItems(sampleData.find((item) => item.bill_id === id).items);
          navigation.navigate("Menu");
          setIsHoltBill(true);
          
          
        },
      },
    ]);
    
  };

  const handleViewDetails = (bill) => {
    setSelectedBill(bill);
    setModalVisible(true);
  };

  // fetch data from backend
  const fetchDate = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log(accessToken);
    try {
      const response = await axios.get( "http://localhost:3003/cashier/history", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSampleData(response.data);

      console.log(response.data[0].items);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchDate();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bill History</Text>

      <ScrollView>
        {/* Card Layout for Bills */}
        {sampleData.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>Bill ID: {item.bill_id}</Text>
            <Text style={styles.cardText}>Total: ${item.total_price}</Text>
            <Text style={styles.cardText}>Phone: {item.customer_phone}</Text>
            <Text style={styles.cardText}>Date: {item.date_time}</Text>
            <Text style={styles.cardText}>
              Status: {item.status === 0 ? "Incomplete" : "Completed"}
            </Text>

            <View style={styles.buttonContainer}>
              {item.status === 0 && (
                <Button
                  title="Continue Bill"
                  onPress={() => handleContinueBill(item.bill_id)}
                  color="#5e48a6"
                />
              )}
              <Button
                title="View Details"
                onPress={() => handleViewDetails(item)}
                color="#4CAF50"
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal for viewing bill details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Bill Details</Text>

            {selectedBill && (
              <View>
                <Text style={styles.modalText}>Bill ID: {selectedBill.bill_id}</Text>
                <Text style={styles.modalText}>
                  Total: ${selectedBill.total_price.toFixed(2)}
                </Text>
                <Text style={styles.modalText}>
                  Phone: {selectedBill.customer_phone}
                </Text>
                <Text style={styles.modalText}>Date: {selectedBill.date_time}</Text>
                <Text style={styles.modalText}>
                  Status:{" "}
                  {selectedBill.status === 0 ? "Incomplete" : "Completed"}
                </Text>

                <Text style={styles.modalSubTitle}>Items:</Text>
                {selectedBill.items.map((item, index) => (
                  <View key={index} style={styles.itemContainer}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.itemImage}
                    />
                    <Text style={styles.price}>
                      {item.name} (x{item.quantity})
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalSubTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  itemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default History;
