import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../assets/utils/custom_button';
import UserContext from '../../utils/contexts/userContext';
import Config from '../../config'; // Ensure this is correctly set up to point to your config file
import { Toast } from 'react-native-toast-notifications';

const PatientListScreen = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchMatchedPatients();
  }, [user]);
 // Depend on user.token specifically if it's stable

 const fetchMatchedPatients = async () => {
  setIsLoading(true);
  const token = await AsyncStorage.getItem('userToken');
  try {
    const response = await fetch(`${Config.BACKEND_API_URL}/matched-patients`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setPatients(data);
  } catch (error) {
    setError('Failed to load patients');
    Toast.show(error.message, {
      type: "error",
      placement: "top",
      duration: 4000,
      offset: 30,
      animationType: "slide-in",
    });
  } finally {
    setIsLoading(false);
  }
};

  const handleDetailPress = patient => {
    navigation.navigate('PatientDetailsScreen', { passedUser: patient });
  };

  const renderPatient = ({ item }) => (
    <TouchableOpacity
      style={styles.therapistItem}
      onPress={() => handleDetailPress(item)}>
      <View style={styles.therapistInfo}>
        <Text style={styles.therapistName}> {item.username}</Text>
        <Text style={styles.therapistSpecialty}>{item.email}</Text>
        
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Error: {error}</Text>
        <CustomButton
          onPress={fetchMatchedPatients} // Directly reference the function
          title="Retry"
          buttonStyle={{
            backgroundColor: 'black',
            width: Dimensions.get('window').width * 0.5,
            alignItems: 'center',
          }}
          textStyle={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}
        />
      </View>
    );
  }

  if (patients.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noPatientsText}>There are no patients matched at this time.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={patients}
        renderItem={renderPatient}
        keyExtractor={item => item.patientId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  therapistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPatientsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  therapistInfo: {
    flex: 1,
  },
  therapistName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  therapistSpecialty: {
    fontSize: 16,
    color: '#888',
  },
  responsesContainer: { 
    marginTop: 10,
  },
  responsesHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  responseItem: {
    fontSize: 14,
    color: '#666',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
  },
});

export default PatientListScreen;