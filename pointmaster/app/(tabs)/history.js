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
import { cashierUrl } from "../../apiurl";

const History = ({ navigation }) => {
  // states to handle selected bill and modal visibility
  const [selectedBill, setSelectedBill] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [sampleData, setSampleData] = useState([]);

  // context to handle bill items and customer
  const { customer, setCustomer, setBillItems, isHoltBill, setIsHoltBill } =
    useContext(BillContext);

  // ----------------- Handle Continue Bill -----------------
  const handleContinueBill = (id) => {

    // native alert to confirm if the user wants to continue the bill
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

  // ----------------- Handle View Details -----------------
  const handleViewDetails = (bill) => {
    setSelectedBill(bill);
    setModalVisible(true);
  };

  // fetch data from backend
  const fetchDate = async () => {
    // get the access token from async storage
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log(accessToken);
    try {
      // fetch data from the server
      const url = cashierUrl;
      const response = await axios.get(
        `${url}/cashier/history`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // set the fetched data to the state
      setSampleData(response.data);
      // console.log(response.data[0].items); // testing
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // ----------------- Render -----------------
  useEffect(() => {
    fetchDate();
  }, []);

  // ----------------- Render -----------------
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
                <Text style={styles.modalText}>
                  Bill ID: {selectedBill.bill_id}
                </Text>
                <Text style={styles.modalText}>
                  Total: ${selectedBill.total_price.toFixed(2)}
                </Text>
                {selectedBill.customer_phone && (
                <Text style={styles.modalText}>
                  Phone: {selectedBill.customer_phone}
                </Text>
                )}
                <Text style={styles.modalText}>
                  Date: {selectedBill.date_time}
                </Text>
                <Text style={styles.modalText}>
                  Status:{" "}
                  {selectedBill.status === 0 ? "Incomplete" : "Completed"}
                </Text>
                <Text style={styles.modalText}>Discount: {selectedBill.discount}</Text>

                <Text style={styles.modalSubTitle}>Items:</Text>
                {selectedBill.items.map((item, index) => (
                  <View key={index} style={styles.itemContainer}>
                    <Image
                      source={{ uri: item.image_url }}
                      style={styles.itemImage}
                    />
                    <Text style={styles.price}>
                      {item.item_name} (x{item.quantity})
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

// ----------------- Styles -----------------
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
