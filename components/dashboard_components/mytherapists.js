import React, {useState, useEffect, useCallback, useContext} from 'react';
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
import { onValue,ref,get,query,orderByChild,equalTo } from 'firebase/database';
import UserContext from '../../utils/contexts/userContext';

const TherapistListScreen = ({navigation}) => {
  const [therapists, setTherapists] = useState([]);
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user}=useContext(UserContext);
  const [matchedTherapists, setMatchedTherapists] = useState([]);


  // ... (API integration or data fetching logic here)

  useEffect(() => {
    const fetchMatchedTherapistsForUser = async () => {
      setIsLoading(true);
      setError(null);
  
      const matchesRef = ref(rtdb, 'matches');
      onValue(matchesRef, async (snapshot) => {
        if (snapshot.exists()) {
          const matchesData = snapshot.val();
          const therapistDetails = [];
  
          for (const therapistId of Object.keys(matchesData)) {
            const patients = matchesData[therapistId];
            if (patients.includes(user.userId)) {
              // Fetch therapist details for each matched therapist ID
              const therapistRef = ref(rtdb, `users/${therapistId}`);
              const therapistSnapshot = await get(therapistRef);
              if (therapistSnapshot.exists()) {
                therapistDetails.push({
                  therapistId,
                  ...therapistSnapshot.val(),
                });
              }
            }
          }
  
          setMatchedTherapists(therapistDetails);
        } else {
          setError('No matches found');
        }
        setIsLoading(false);
      }, (errorObject) => {
        setError('The read failed: ' + errorObject.code);
        setIsLoading(false);
      });
    };
  
    if (user && user.userId) {
      fetchMatchedTherapistsForUser();
    } else {
      setIsLoading(false);
      setError('User context is not set');
    }
  }, [user]);


  const handleDetailPress = therapist => {
    // Handle interaction logic here:
    navigation.navigate('TherapistDetailsScreen', {passedUser:therapist}); // Example navigation
  };

  const renderTherapist = ({item}) => (
    
    <TouchableOpacity
      style={styles.therapistItem}
      onPress={() => handleDetailPress(item)}>
      <View style={styles.therapistInfo}>
        <Text style={styles.therapistName}>{item.lastName}</Text>
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
        data={matchedTherapists}
        renderItem={renderTherapist}
        keyExtractor={item => item.therapistId || item.someUniqueIdentifier}
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

export default TherapistListScreen;
