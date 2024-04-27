import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Modal
} from 'react-native';
import CustomButton from '../../assets/widgets/custom_button';
import { rtdb } from '../../firebaseConfig';
import { onValue,ref,get} from 'firebase/database';
import FeedbackForm from './feedbackForm';
import UserContext from '../../utils/contexts/userContext';
import mystyles from '../../assets/stylesheet';
import { ScrollView } from 'react-native-gesture-handler';

const PatientListScreen = ({navigation}) => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPatientId, setExpandedPatientId] = useState(null);
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const {user}=useContext(UserContext);
  const [matchedPatients, setMatchedPatients] = useState([]);




//useeffect to fetch the patients with which a therapist is matched
  useEffect(() => {
    const fetchMatchedPatientsForTherapist = async () => {
      setIsLoading(true);
      setError(null);

      const matchesRef = ref(rtdb, `matches/${user.userId}`); // Path to the therapist's matches
      onValue(matchesRef, async (snapshot) => {
        if (snapshot.exists()) {
          const patientIds = snapshot.val(); // This should be an array of patient IDs
          const patientDetails = [];

          for (const patientId of patientIds) {
            const patientRef = ref(rtdb, `users/${patientId}`);
            const patientSnapshot = await get(patientRef);
            if (patientSnapshot.exists()) {
              patientDetails.push({
                patientId,
                ...patientSnapshot.val(),
              });
            }
          }

          setMatchedPatients(patientDetails);
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
      fetchMatchedPatientsForTherapist();
    } else {
      setIsLoading(false);
      setError('User context is not set');
    }
  }, [user]);


   const handleOpenFeedbackModal = (patient) => {
    setSelectedPatientId(patient.userId);
    setIsFeedbackModalVisible(true);
  };

  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalVisible(false);
  };


  const handleToggleDropdown = (patientId) => {
    //Toggle the dropdown only for the clicked patient
    setExpandedPatientId(expandedPatientId === patientId ? null : patientId);
   };

  const handleDetailPress = patient => {
    // Handle interaction logic here:
    navigation.navigate('PatientDetailsScreen', {passedUser:patient}); // Example navigation
  };

  const renderPatient = ({ item }) => {
    // Ensure you have a unique identifier for each patient, such as `item.id`
    const isExpanded = expandedPatientId === item.id;
    const dropdownIndicator = isExpanded ? '▲' : '▼';
    // const itemBackgroundColor = isExpanded ? 'lightgray' : 'white'; // Change background color when expanded

    return (
      <View>
        <TouchableOpacity
          style={styles.patientsItem}
          onPress={() => handleToggleDropdown(item.id)}>
          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>{item.lastName}</Text>
            <Text style={styles.patientName}>{item.email}</Text>
          </View>
          <Text style={styles.dropdownIndicator}>{dropdownIndicator}</Text>

        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.dropdownContainer}>
            {/* Action buttons for the patient */}
            <CustomButton
              onPress={() => navigation.navigate('Chat', { passedUser: item })}
              title="Message chat"
              textStyle={styles.buttonText}
            />
            <CustomButton
              onPress={() => navigation.navigate('VideoCallPage', { passedUser: item })}
              title="Video call"
              buttonStyle={styles.custombutton}
              textStyle={styles.buttonText}
            />
            <CustomButton
              onPress={() => navigation.navigate('VoiceCall', { passedUser: item })}
              title="Voice call"
              buttonStyle={styles.custombutton}
              textStyle={styles.buttonText}
            />
            <CustomButton
              onPress={()=>handleOpenFeedbackModal(item)}
              title="Send Feedback"
              buttonStyle={styles.custombutton}
              textStyle={styles.buttonText}
            />
          </View>
        )}
      </View>
    );
  };



  if (isLoading) {
    return(
      <View style={mystyles.loadingContainer}>
        <ActivityIndicator size="large" style={mystyles.loadingIndicator} />
        <Text style={mystyles.loadingText}>Loading clients list, please wait...</Text>
      </View>
    );  
  }
//action of retrying if initial request failed
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Error: {error}</Text>
        <CustomButton
          onPress={fetchMatchedPatientsForTherapist}
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
        data={matchedPatients}
        renderItem={renderPatient}
        keyExtractor={item => item.patientId}
      />
       {/* Feedback Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFeedbackModalVisible}
        onRequestClose={handleCloseFeedbackModal}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>

        <View style={styles.modalContainer}>
          {/* the feedback form is shown here */}
          <FeedbackForm
            patientId={selectedPatientId}
          />
          <CustomButton
            onPress={handleCloseFeedbackModal}
            title="Close"
            buttonStyle={styles.custombutton}
            textStyle={styles.buttonText}
          />
        </View>
        </ScrollView>

      </Modal>
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
  dropdownContainer: {
    backgroundColor: '#f9f9f9', // Choose an appropriate background color
    padding: 10,
    // Add any additional styling for the dropdown container
  },
  custombutton: {
    // Your button styles
    marginVertical: -30, // Add vertical spacing between buttons
  
    // Add any additional styling for the buttons
  },
  buttonText: {
    // Your button text styles
    color: 'white',
    fontWeight: 'bold',
  },
  dropdownIndicator: {
    // Style for the dropdown indicator
    fontSize: 18,
    color: '#31363F',
    marginRight: 10, // Add some margin to the right of the indicator
  },
  modalContainer: {
    margin: 20,
    backgroundColor: '#257DE9',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollViewContainer: {
    alignItems: 'center', // Center the content horizontally
    marginHorizontal:20,

  }
});

export default PatientListScreen;
