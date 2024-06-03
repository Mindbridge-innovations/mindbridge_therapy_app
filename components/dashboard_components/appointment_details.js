import React, { useEffect } from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import mystyles from '../../assets/stylesheet';
import CustomButton from '../../assets/utils/custom_button';
import {useNavigation} from '@react-navigation/native';
import AppointmentBookingScreen from './bookappointment';
import UserContext from '../../utils/contexts/userContext';

const AppointmentDetailsScreen = ({route}) => {
  const {appointment} = route.params;
  const navigation = useNavigation();
  const { user , isAuthenticated} = useEffect(UserContext);


  //call back effect to monitor user auth status and redirect accordingly/ prevent screen access without login
  useEffect(() => {
    if (!isAuthenticated) {
        navigation.navigate('SignInScreen');
    }
}, [isAuthenticated, navigation]);

  //const variables to hold the modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  //function to call when an appoinmtnet is pressed
  const handleInteractPress = appointment => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={mystyles.dashviewcontainer}>
      <View style={{flex: 1, alignItems: 'center', width: '90%'}}>
        <View style={{backgroundColor: 'lightgray', borderRadius: 10}}>
          <View style={{padding: 10}}>
            <Text>Patient name: {appointment.name}</Text>
            <Text>
              Appointment date & time: {appointment.date} {appointment.time}
            </Text>
            <Text>Reason: {appointment.reason}</Text>
            <Text>Note: {appointment.description}</Text>
          </View>
        </View>

        <CustomButton
          onPress={null}
          title="Cancel appointment"
          textStyle={{color: 'white', fontWeight: 'bold'}}
        />

        <CustomButton
          onPress={null}
          title="Reschedule appointment"
          buttonStyle={styles.custombutton}
          textStyle={{color: 'white', fontWeight: 'bold'}}
        />
      </View>
    </ScrollView>
  );
};
export default AppointmentDetailsScreen;

const styles = StyleSheet.create({
  custombutton: {
    backgroundColor: 'black',
    alignItems: 'center',
    marginHorizontal: 1,
  },
});
