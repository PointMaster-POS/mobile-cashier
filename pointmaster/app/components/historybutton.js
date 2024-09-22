import React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HistoryButton = () => {
  const navigation = useNavigation();

  return (
    <Button
      title="History"
      onPress={() => navigation.navigate("History")}
    />
  );
};

export default HistoryButton;
