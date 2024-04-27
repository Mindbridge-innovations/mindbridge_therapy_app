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
import CustomButton from '../../assets/widgets/custom_button';
import UserContext from '../../utils/contexts/userContext';
import Config from '../../config'; // Ensure this is correctly set up to point to your config file

const TherapistListScreen = ({ navigation }) => {
  const [therapists, setTherapists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchMatchedTherapists();
  }, []); // Depend on user.token specifically if it's stable

  const fetchMatchedTherapists = async () => {
    const token = await AsyncStorage.getItem('userToken');

    

    setIsLoading(true);

    try {
      const response = await fetch(`${Config.BACKEND_API_URL}/matched-therapists`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTherapists(data);
    } catch (error) {
      console.error('Failed to fetch matched therapists:', error);
      setError('Failed to load therapists');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetailPress = therapist => {
    navigation.navigate('TherapistDetailsScreen', { passedUser: therapist });
  };

  const renderTherapist = ({ item }) => (
    <TouchableOpacity
      style={styles.therapistItem}
      onPress={() => handleDetailPress(item)}>
      <View style={styles.therapistInfo}>
        <Text style={styles.therapistName}>Dr. {item.lastName} {item.firstName}</Text>
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
          onPress={fetchMatchedTherapists} // Directly reference the function
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
        data={therapists}
        renderItem={renderTherapist}
        keyExtractor={item => item.therapistId}
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

export default TherapistListScreen;