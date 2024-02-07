import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  Button,
  Dimensions
} from 'react-native';
import CustomButton from '../../assets/widgets/custom_button';

const AppointmentManagementScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        // Simulated data
        const data = [
            { id: 1, name: 'John Doe', date: '12/04/2024',time:'12:30', reason:'Substance Abuse Counseling',description:'I\'m experiencing heightened anxiety and would like to discuss coping strategies and potential treatments.'},
            { id: 2, name: 'Winny Ayebare', date: '01/02/2024',time:'12:00', reason:'Substance Abuse Counseling',description:'I\'m experiencing heightened anxiety and would like to discuss coping strategies and potential treatments.'},
            { id: 3, name: 'Kamsi Edochi', date: '12/02/2024',time:'10:00', reason:'Substance Abuse Counseling',description:'I\'m experiencing heightened anxiety and would like to discuss coping strategies and potential treatments.'},
            { id: 4, name: 'John Trevor', date: '13/02/2024',time:'01:30', reason:'Substance Abuse Counseling',description:'I\'m experiencing heightened anxiety and would like to discuss coping strategies and potential treatments.'},
            { id: 5, name: 'Mamgbi Geofrey', date: '01/03/2024',time:'02:30', reason:'Substance Abuse Counseling',description:'I\'m experiencing heightened anxiety and would like to discuss coping strategies and potential treatments.'},
            { id: 6, name: 'Alva Geof', date: '12/04/2024',time:'12:34', reason:'Substance Abuse Counseling',description:'I\'m experiencing heightened anxiety and would like to discuss coping strategies and potential treatments.'},
            { id: 7, name: 'Negredo Geof', date: '12/04/2024',time:'12:34', reason:'Substance Abuse Counseling',description:'I\'m experiencing heightened anxiety and would like to discuss coping strategies and potential treatments.'},
  
           
           
            // Add more therapists as needed
          ];
        setAppointments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInteractPress = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const renderAppointment = ({ item }) => (
    <TouchableOpacity style={styles.appointmentItem} onPress={() => handleInteractPress(item)}>
      <View style={styles.appointmentInfo}>
        <Text style={styles.appointmentName}>{item.name}</Text>
        <Text style={styles.appointmentSpecialty}>{item.reason}</Text>
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
        <Button title="Retry" onPress={() => { /* retry logic */ }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedAppointment && (
              <>
                <Text style={styles.modalText}>Patient name: {selectedAppointment.name}</Text>
                <Text style={styles.modalText}>Appointment date & time: {selectedAppointment.date} {selectedAppointment.time}</Text>
                <Text style={styles.modalText}>Reason: {selectedAppointment.reason}</Text>
                <Text style={styles.modalText}>Note: {selectedAppointment.description}</Text>
                <CustomButton
                  onPress={() => {
                    // Add logic to cancel the appointment
                    setModalVisible(!modalVisible);
                  }}
                  title="Accept appointment"
                  buttonStyle={{ marginTop:20, marginBottom:20 }}
                  textStyle={{ color: 'white', fontWeight: 'bold' }}
                />
                <CustomButton
                  onPress={() => {
                    // Add logic to cancel the appointment
                    setModalVisible(!modalVisible);
                  }}
                  title="Cancel appointment"
                  buttonStyle={{marginBottom:20 }}
                  textStyle={{ color: 'white', fontWeight: 'bold' }}
                />
                <CustomButton
                  onPress={() => {
                    // Add logic to reschedule the appointment
                    setModalVisible(!modalVisible);
                  }}
                  title="Reschedule appointment"
                  buttonStyle={{ marginBottom:20 }}
                  textStyle={{ color: 'white', fontWeight: 'bold' }}
                />
                <CustomButton
                  onPress={() => setModalVisible(!modalVisible)}
                  title="Close"
                  buttonStyle={{ marginBottom:20 }}
                  textStyle={{ color: 'white', fontWeight: 'bold' }}
                />
              </>
            )}
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
  },
  appointmentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  appointmentSpecialty: {
    fontSize: 16,
    color: '#888',
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
    color:'white',
    fontSize:16
  },
});
