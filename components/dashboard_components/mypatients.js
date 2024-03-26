import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
} from 'react-native';
import CustomButton from '../../assets/widgets/custom_button';
import { rtdb } from '../../firebaseConfig';
import { onValue,ref,query,orderByChild,equalTo } from 'firebase/database';

const PatientListScreen = ({navigation}) => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ... (API integration or data fetching logic here)

  // Example API call using `fetch`:
  useEffect(() => {
    // Create a query to get users where role is 'therapist'
    const patientsQuery = query(ref(rtdb, 'users'), orderByChild('role'), equalTo('client'));

    const unsubscribe = onValue(patientsQuery, (snapshot) => {
      const patientsData = snapshot.val();
      const patientsList = patientsData ? Object.values(patientsData) : [];
      setPatients(patientsList);
      setIsLoading(false);
    }, (errorObject) => {
      setError(errorObject.message);
      setIsLoading(false);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleDetailPress = patient => {
    // Handle interaction logic here:
    navigation.navigate('PatientDetailsScreen', {passedUser:patient}); // Example navigation
  };

  const renderPatient = ({item}) => (
    
    <TouchableOpacity
      style={styles.patientsItem}
      onPress={() => handleDetailPress(item)}>
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{item.lastName}</Text>
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
          onPress={null}
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

  return (
    <View style={styles.container}>
      <FlatList
        data={patients}
        renderItem={renderPatient}
        keyExtractor={item => item.id || item.someUniqueIdentifier}
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
  patientsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  therapistSpecialty: {
    fontSize: 16,
    color: '#888',
  },
  interactButton: {
    fontSize: 16,
    color: '#007bff',
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
