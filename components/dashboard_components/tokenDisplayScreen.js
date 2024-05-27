import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import CustomButton from '../../assets/utils/custom_button';
import mystyles  from '../../assets/stylesheet';
import { Toast } from 'react-native-toast-notifications';
import Config from '../../config';


function TokenDisplayScreen() {
  const [token, setToken] = useState('');

  const fetchToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await fetch(`${Config.BACKEND_API_URL}/generate-vr-token`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (response.ok) {
        setToken(result.token);
      } else {
        Toast.show(result.message, {
          type: "warning",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(token);
    Toast.show("Token copied to clipboard!", {
      type: "success",
      placement: "top",
      duration: 2000,
      offset: 30,
      animationType: "slide-in",
    });
  };

  return (
    <ScrollView contentContainerStyle={mystyles.dashviewcontainer}>
      <View style={{ alignItems: 'center', marginTop: 40, marginHorizontal:20 }}>
        <Text style={{ fontSize: 16, marginBottom: 20 }}>Your Virtual reality (VR) token has been generated successfully, you can now copy it to share with you client/patient, and you can also generate more tokens if needed!</Text>
        <View style={styles.tokenContainer}>
          <TextInput
            style={styles.tokenInput}
            value={token}
            editable={false}
            placeholder="Token will appear here"
          />
          <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
            <Text style={styles.buttonText}>Copy</Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          title="Generate another token"
          onPress={fetchToken}
          buttonStyle={{
            backgroundColor: 'black',
            padding: 10,
            borderRadius: 15,
            width: Dimensions.get('window').width * 0.9,
          }}
          textStyle={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  tokenInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    color: 'black'
  },
  copyButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
});

export default TokenDisplayScreen;