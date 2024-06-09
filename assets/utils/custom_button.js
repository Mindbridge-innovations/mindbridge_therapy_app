import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const CustomButton = ({ onPress, title, buttonStyle, textStyle, isLoading }) => (
  <TouchableOpacity
    style={[styles.button, buttonStyle]}
    onPress={onPress}
    disabled={isLoading}  // Disable the button when loading
  >
    {isLoading ? (
      <ActivityIndicator size="small" color="#FFFFFF" />
    ) : (
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    )}
  </TouchableOpacity>
);

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 50,
    height: 44,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#555',  // Optional: change to a different color when disabled
  },
});