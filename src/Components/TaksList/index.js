import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const TaskList = ({ data, deleteItem, updateItem }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => deleteItem(data.key)}
      >
        <FontAwesome name="trash-o" size={20} color="white" />
      </TouchableOpacity>
      <View style={{ paddingRight: 10 }}>
        <TouchableWithoutFeedback onPress={() => updateItem(data)}>
          <Text style={{ color: "#FFF", paddingRight: 10 }}>{data.nome}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#121212",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
  },
});
