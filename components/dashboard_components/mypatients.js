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
} from 'react-native';

const PatientListScreen = ({navigation}) => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ... (API integration or data fetching logic here)

  // Example API call using `fetch`:
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://your-api-endpoint');
        const data = await response.json();
        setPatients(data.patients); // Or your API's specific structure
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInteractPress = patient => {
    // Handle interaction logic here:
    // - Navigate to a chat screen
    // - Open a video call
    // - Send a message
    // - Show more information
    navigation.navigate('ChatScreen', {patient}); // Example navigation
  };

  const renderPatient = ({item}) => (
    <TouchableOpacity
      style={styles.patientItem}
      onPress={() => handleInteractPress(item)}>
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{item.name}</Text>
        <Text style={styles.patientSpecialty}>{item.specialty}</Text>
      </View>
      <Text style={styles.interactButton}>Interact</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Error: {error}</Text>
        <Button title="Retry" onPress={null} />
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
  patientItem: {
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
  patientSpecialty: {
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
