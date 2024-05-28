import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import mystyles from '../stylesheet';

const PasswordInput = ({ value, onChangeText, style }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={mystyles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!passwordVisible}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggle}>
        <Text style={{color:'black', fontWeight:'bold'}}>{passwordVisible ? 'Hide password' : 'Show password'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  input: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  toggle: {
    padding: 10,
  }
});

export default PasswordInput;