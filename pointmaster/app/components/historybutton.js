import React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HistoryButton = () => {

  // navigation to history page
  const navigation = useNavigation();

  // ----------------- Handle the navigation to the history page -----------------
  return (
    <Button
      title="History"
      onPress={() => navigation.navigate("History")}
    />
  );
};

export default HistoryButton;
