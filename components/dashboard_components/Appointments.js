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
  Dimensions,
} from 'react-native';
import CustomButton from '../../assets/widgets/custom_button';
import mystyles from '../../assets/stylesheet';
import {DatePicker, TimePicker} from './datePicker';
import { rtdb } from '../../firebaseConfig';
import { onValue,ref,query,orderByChild,get,update ,equalTo} from 'firebase/database';
import { where } from 'firebase/firestore';
import UserContext from '../../utils/contexts/userContext';
import {Picker} from '@react-native-picker/picker';

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
  const [filter, setFilter] = useState('all'); // State to hold the current filter value



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

    const filteredAppointments = appointmentsWithUserDetails.filter((appointment) => {
      if (filter === 'all') {
        return true; // Show all appointments
      }
      return appointment.status === filter; // Show appointments that match the filter
    });

    setAppointments(filteredAppointments);
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
  }, [filter]);

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
          {user.role==="therapist" && (
          <Text style={styles.appointmentSpecialty}>Booked by: {item.user.username}</Text>
          )}
          <Text style={styles.statusIndicator}>Status: {item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={mystyles.loadingContainer}>
        <ActivityIndicator size="large" style={mystyles.loadingIndicator} />
        <Text style={mystyles.loadingText}>Loading appointments, please wait...</Text>
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
    
    
    <View style={{flex:1}}>

      {/* setting a filter system for appointments */}
      <View style={{flexDirection: 'row', alignItems: 'center',paddingHorizontal:5}}>
        <Text style={{backgroundColor: 'black', color: 'white', padding: 15}}>Show by filter</Text>
        <View style={{flex: 1, borderWidth: 1, borderColor: '#ddd'}}>
          <Picker
            selectedValue={filter}
            onValueChange={(itemValue, itemIndex) => setFilter(itemValue)}
            style={{height: 20, width: '100%'}}>
            <Picker.Item label="All" value="all" />
            <Picker.Item label="Pending" value="pending" />
            <Picker.Item label="Rescheduled" value="rescheduled" />
            <Picker.Item label="Accepted" value="accepted" />
            <Picker.Item label="Cancelled" value="cancelled" />
            <Picker.Item label="Done" value="done" />
          </Picker>
        </View>
      </View>
      
      <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => (
          // Render this component when the list is empty
          <View style={styles.noAppointmentsView}>
            <Text style={styles.noAppointmentsText}>
              No appointments found for the selected filter.
            </Text>
          </View>
        )}
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
                {(user.role === "therapist" && selectedAppointment.status!=="done") && (selectedAppointment.status==="rescheduled"|| selectedAppointment.status === "pending")  && (
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
               
               {(selectedAppointment.status !== "cancelled" && selectedAppointment.status !== "done") &&(
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
                
                {(selectedAppointment.status !== "done" && selectedAppointment.status !== "cancelled") && (
                <CustomButton
                  onPress={() => {
                    setRescheduleModalVisible(true);
                    setModalVisible(false);
                  }}
                  title="Reschedule appointment"
                  buttonStyle={{marginBottom: 20}}
                  textStyle={{color: 'white', fontWeight: 'bold'}}
                />
                )}

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
    </View>
  );
};

export default AppointmentManagementScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
  filterContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor:'lightgray',
    paddingTop:-30,
    paddingLeft:-20
  },
  pickerStyle: {
    height: 50,
  },
  
  noAppointmentsView: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical:'50%'
  },
  noAppointmentsText: {
    fontSize: 16,
    color: '#888',
  },
  
});
