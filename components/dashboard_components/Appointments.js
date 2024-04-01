import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Button,
  Alert,
} from 'react-native';
import CustomButton from '../../assets/widgets/custom_button';
import mystyles from '../../assets/stylesheet';
import {DatePicker, TimePicker} from './datePicker';
import { rtdb } from '../../firebaseConfig';
import { onValue,ref,query,orderByChild,get,update ,equalTo} from 'firebase/database';
import { where } from 'firebase/firestore';
import UserContext from '../../utils/contexts/userContext';

const AppointmentManagementScreen = ({navigation}) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);
  const {user}=useContext(UserContext)
  const [cancellationReason, setCancellationReason] = useState('');
  const  [newDate, setNewDate]=useState(new Date())
  const  [newTime, setNewTime]=useState(new Date())


  const formatDate = date => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const formatTime = time => {
    return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
  };


  useEffect(() => {

    let appointmentsQuery;

  if (user.role === 'therapist') {
    // If the user is a therapist, fetch only their appointments
    appointmentsQuery = query(ref(rtdb, 'appointments'), orderByChild('therapistId'), equalTo(user.userId));
  } else if (user.role === 'client') {
    // If the user is an admin, fetch all appointments
    appointmentsQuery = query(ref(rtdb, 'appointments'), orderByChild('userId'),equalTo(user.userId));
  } 

  const unsubscribe = onValue(appointmentsQuery, async (snapshot) => {
    const appointmentsData = snapshot.val();
    // const appointmentsList = appointmentsData ? Object.values(appointmentsData) : [];
    const appointmentsList = appointmentsData
    ? Object.entries(appointmentsData).map(([key, value]) => ({
        ...value,
        id: key, // Ensure the 'id' property is set
      }))
    : [];

    // Fetch user details for each appointment
    const appointmentsWithUserDetails = await Promise.all(appointmentsList.map(async (appointment) => {
      const userRef = ref(rtdb, `users/${appointment.userId}`);
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val();
      return {
        ...appointment,
        user: userData ? userData : { username: 'Unknown' }, // Include the entire user data
      };
    }));

    setAppointments(appointmentsWithUserDetails);
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

  //show modal when an appointment is selected
  const handleInteractPress = appointment => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };


  //function to accept an appointment by a therapist
  const acceptAppointment = async (appointmentId) => {
    const appointmentRef = ref(rtdb, `appointments/${appointmentId}`);
    try {
      await update(appointmentRef, { status: 'accepted' });
      // Update the local state to reflect the change 
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === appointmentId ? { ...appt, status: 'accepted' } : appt
        )
      );
    } catch (error) {
      // Handle any errors that occur during the update
      console.error("Failed to accept appointment:", error);
    }
  };


  //function to cancel an appointment
  const cancelAppointment = async (appointmentId, reason) => {
    const appointmentRef = ref(rtdb, `appointments/${appointmentId}`);
    try {
      await update(appointmentRef, {
        status: 'cancelled',
        cancellationReason: reason,
        cancelledBy: user.username, // Assuming `user` has a `userId` property
      });
      // Update the local state to reflect the change
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === appointmentId
            ? { ...appt, status: 'cancelled', cancellationReason: reason, cancelledBy: user.userId }
            : appt
        )
      );
      // Clear the cancellation reason input
      setCancellationReason('');
    } catch (error) {
      // Handle any errors that occur during the update
      console.error("Failed to cancel appointment:", error);
    }
  };


  //function to handle cancelling of an appointment
  const handleCancelPress = appointment => {
    setSelectedAppointment(appointment);
    setCancelModalVisible(true);
  };


  //function to handle the rescheduling of an appointment
  const rescheduleAppointment = async (appointmentId, newDate, newTime) => {
    const appointmentRef = ref(rtdb, `appointments/${appointmentId}`);
    try {
      await update(appointmentRef, {
        status: 'rescheduled',
        date: formatDate(newDate), // Use your formatDate function
        time: formatTime(newTime), // Use your formatTime function
        rescheduledBy:user.lastName,
      });
      // Update the local state to reflect the change
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === appointmentId
            ? { ...appt, status: 'rescheduled', date: formatDate(newDate), time: formatTime(newTime) }
            : appt
        )
      );
    } catch (error) {
      // Handle any errors that occur during the update
      console.error("Failed to reschedule appointment:", error);
    }
  };

  //function that displays the list of appointments
  const renderAppointment = ({item}) => (
    <TouchableOpacity
      style={styles.appointmentItem}
      onPress={() => handleInteractPress(item)}>
      <View style={{flex: 1, marginVertical: 5}}>
        <View style={styles.appointmentInfo}>
          <Text style={styles.appointmentName}>{item.reason}</Text>
          <Text style={styles.appointmentDate}>
            {item.date} {item.time}
          </Text>
        </View>
        <Text style={styles.appointmentSpecialty} numberOfLines={1}
        ellipsizeMode="tail">{item.description}</Text>
        <View style={styles.appointmentInfo}>
          <Text style={styles.appointmentSpecialty}>Booked by: {item.user.username}</Text>
          <Text style={styles.statusIndicator}>Status: {item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" style={styles.loadingIndicator} />
        <Text style={styles.loadingText}>Loading appointments, please wait...</Text>
      </View>
    );  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Error: {error}</Text>
        <Button
          title="Retry"
          onPress={() => {
            /* retry logic */
          }}
        />
      </View>
    );
  }

  return (
    
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={item => item.id.toString()}
      />

      {/* Appointment Details Modal to view an appointment in the list in details after press on it */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedAppointment && (
              
              <>
              
                <Text style={styles.modalText}>
                  Client name: {selectedAppointment.user.username}
                </Text>
                <Text style={styles.modalText}>
                  Appointment date & time: {selectedAppointment.date}{' '}
                  {selectedAppointment.time}
                </Text>
                <Text style={styles.modalText}>
                  Reason: {selectedAppointment.reason}
                </Text>
                <Text style={styles.modalText}>
                  Note: {selectedAppointment.description}
                </Text>
                <Text style={styles.modalText}>
                  Status: {selectedAppointment.status}
                </Text>
                {selectedAppointment.status==='cancelled' &&([
                   <Text style={styles.modalText}>
                   Cancelled by: {selectedAppointment.cancelledBy}
                 </Text>,
                  <Text style={styles.modalText}>
                  Cancellation reason: {selectedAppointment.cancellationReason}
                </Text>
                ]
                )}
                {user.role==="therapist" && (
                   <CustomButton
                   onPress={() => {
                     // Add logic to accept the appointment
                     acceptAppointment(selectedAppointment.id);
                     setModalVisible(!modalVisible);
                   }}
                   title="Accept appointment"
                   buttonStyle={{marginTop: 20, marginBottom: 20}}
                   textStyle={{color: 'white', fontWeight: 'bold'}}
                 />

                )}
               
               {selectedAppointment.status==="accepted" || selectedAppointment.status==='rescheduled' &&(
                <CustomButton
                onPress={() => {
                  setCancelModalVisible(true);
                  setModalVisible(false);
                }}
                title="Cancel appointment"
                buttonStyle={{marginBottom: 20}}
                textStyle={{color: 'white', fontWeight: 'bold'}}
              />

               )}
                
                <CustomButton
                  onPress={() => {
                    setRescheduleModalVisible(true);
                    setModalVisible(false);
                  }}
                  title="Reschedule appointment"
                  buttonStyle={{marginBottom: 20}}
                  textStyle={{color: 'white', fontWeight: 'bold'}}
                />
                <CustomButton
                  onPress={() => setModalVisible(!modalVisible)}
                  title="Close"
                  buttonStyle={{marginBottom: 20}}
                  textStyle={{color: 'white', fontWeight: 'bold'}}
                />
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Cancel Appointment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={cancelModalVisible}
        onRequestClose={() => {
          setCancelModalVisible(!cancelModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to cancel this appointment?
            </Text>
            <View style={{marginBottom: 20}}>
              <Text style={mystyles.label}>
                Please enter a reason for cancellation
              </Text>
              <TextInput
                style={mystyles.input}
                placeholder="Enter cancellation reason"
                value={cancellationReason}
                onChangeText={setCancellationReason}
                multiline
                numberOfLines={3}
              />
            </View>
            <CustomButton
              onPress={() => {
                // Add logic to confirm cancellation
                cancelAppointment(selectedAppointment.id, cancellationReason);
                setCancelModalVisible(!cancelModalVisible);
                Alert.alert('Appointment cancelled successfully!')
              }}
              title="Yes, Cancel it"
              buttonStyle={{marginBottom: 20}}
              textStyle={{color: 'white', fontWeight: 'bold'}}
            />
            <CustomButton
              onPress={() => setCancelModalVisible(!cancelModalVisible)}
              title="No, Go back"
              buttonStyle={{marginBottom: 20}}
              textStyle={{color: 'white', fontWeight: 'bold'}}
            />
          </View>
        </View>
      </Modal>

      {/* Reschedule Appointment Modal*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={rescheduleModalVisible}
        onRequestClose={() => {
          setRescheduleModalVisible(!rescheduleModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Please select a new date and time for the appointment.
            </Text>
            {/* Add date and time picker or other UI for rescheduling */}
            <DatePicker isBackgroundBlue={true} date={newDate} onDateChange={setNewDate}/>
            <TimePicker isBackgroundBlue={true} time={newTime} onTimeChange={setNewTime} />
            <CustomButton
              onPress={() => {
                // Add logic to confirm rescheduling
                rescheduleAppointment(selectedAppointment.id, newDate,newTime);
                setRescheduleModalVisible(!rescheduleModalVisible);
                Alert.alert('Apointment rescheduled successfully!')
              }}
              title="Reschedule"
              buttonStyle={{marginBottom: 20}}
              textStyle={{color: 'white', fontWeight: 'bold'}}
            />
            <CustomButton
              onPress={() => setRescheduleModalVisible(!rescheduleModalVisible)}
              title="Cancel"
              buttonStyle={{marginBottom: 20}}
              textStyle={{color: 'white', fontWeight: 'bold'}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AppointmentManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  appointmentInfo: {
    flex: 1,
    flexDirection: 'row', // Add this line
    justifyContent: 'space-between',
  },
  appointmentName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: 'black',
  },
  appointmentDate: {
    fontSize: 15,
    fontStyle: 'italic',
    color: 'blue',
    fontWeight: '300',
    textAlign: 'right',
  },
  appointmentSpecialty: {
    fontSize: 16,
    color: '#888',
  },
  statusIndicator: {
    fontSize: 16,
    color: '#888',
    textTransform:'uppercase'
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#255ECC',
    borderRadius: 20,
    padding: 35,
    alignItems: 'left',
    shadowColor: 'green',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    color: 'white',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
});
