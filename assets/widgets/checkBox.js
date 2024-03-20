import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import mystyles from "../stylesheet";

const Checkbox = ({ label, value, onCheck }) => {
    return (
      <TouchableOpacity style={mystyles.checkboxContainer} onPress={() => onCheck(label)}>
        <View style={[mystyles.checkbox, value ? mystyles.checkboxChecked : null]} />
        <Text style={mystyles.checkboxLabel}>{label}</Text>
      </TouchableOpacity>
    );
  };
  export default Checkbox