import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CustomButton from '../../assets/utils/custom_button';
import mystyles from '../../assets/stylesheet';
import {Picker} from '@react-native-picker/picker';
import {DatePicker, TimePicker} from './datePicker';
import Config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AppointmentBookingScreen = ({isBackgroundBlue,route}) => {
  const {passedUser}=route.params
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const  [date, setDate]=useState(new Date())
  const  [time, setTime]=useState(new Date())
  const navigation=useNavigation()

  const [mode,setSelectedMode]=useState('')


  const formatDate = date => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const formatTime = time => {
    return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleBookingSubmit = async () => {
    const appointmentData={
      date:formatDate(date),
      time:formatTime(time),
      reason:reason,
      description:description,
      appointmentType:mode,
      therapistId:passedUser.userId,
      status:"pending"
    }
    const token = await AsyncStorage.getItem('userToken');

   console.log(appointmentData)
   
    try {
      // Replace 'http://your-backend-url.com' with your actual backend URL
      const response = await fetch(`${Config.BACKEND_API_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json();

      if (response.ok) {
        // Handle successful registration
        alert(
          'Your new appointment has been booked.Please wait for confirmation from your doctor',
        );
        navigation.navigate('AppointmentBookingScreen',{passedUser});
      } else {
        // Handle errors
        alert(result.message);
      }
    } catch (error) {
      // Handle network errors
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={mystyles.dashviewcontainer}>
      <View style={{width: '100%'}}>
        <Text style={styles.title}>Book a Therapy Session with Dr. {passedUser.lastName}</Text>
      </View>

      <Text
        style={{
          width: '90%',
          color: 'black',
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        Please note that your therapist or doctor may reschedule this
        appointment to fit his/her time schedule. You will be informed of such!
      </Text>

      <View style={{width: '90%'}}>
        <DatePicker isBackgroundBlue={false} label={'Please select your suitable date for the appointment'} 
         date={date} 
        onDateChange={setDate}
        />
        <TimePicker label={'Please select your suitable time for the appointment'} time={time} onTimeChange={setTime}/>

        <View style={{marginBottom: 20}}>
          <Text style={mystyles.dashlabel}>
            What is the reason for your appointment
          </Text>
          <View style={mystyles.dashinput}>
            <Picker
              selectedValue={reason}
              onValueChange={(itemValue, itemIndex) =>
                setReason(itemValue)
              }>
              <Picker.Item label="Choose your preference" value="" />
              <Picker.Item
                label="Marriage and Family Therapy"
                value="Marriage and Family Therapy"
              />
              <Picker.Item
                label="Substance Abuse Counseling"
                value="Substance Abuse Counseling"
              />
              <Picker.Item
                label="Trauma and PTSD Treatment"
                value="Trauma and PTSD Treatment"
              />
              <Picker.Item
                label="Anxiety or Depression Counseling"
                value="Anxiety or Depression Counseling"
              />
              <Picker.Item
                label="Child and Adolescent Therapy"
                value="Child and Adolescent Therapy"
              />
              <Picker.Item
                label="LGBTQ+ Counseling"
                value="LGBTQ+ Counseling"
              />
              <Picker.Item
                label="Career Counseling"
                value="Career Counseling"
              />
            </Picker>
          </View>
        </View>

        <View>
          <Text style={mystyles.dashlabel}>
            Please describe briefly the need for this appointment
          </Text>
          <TextInput
            style={mystyles.dashinput}
            placeholder="Brief description of your needs"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            maxLength={200}
          />
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={mystyles.dashlabel}>
            Please select the required mode of appointment
          </Text>
          <View style={mystyles.dashinput}>
            <Picker
              selectedValue={mode}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedMode(itemValue)
              }>
              <Picker.Item label="Choose your preference" value="" />
              <Picker.Item
                label="Physical (in office)"
                value="Physical (in office)"
              />
              <Picker.Item label="Video call" value="Video call" />
              <Picker.Item label="Voice call" value="Voice call" />

            </Picker>
          </View>
        </View>

        <CustomButton
          onPress={handleBookingSubmit}
          title="Book Appointment"
          buttonStyle={{
            backgroundColor: 'black',
            padding: 10,
            borderRadius: 15,
            marginTop: 20,
          }}
          textStyle={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    backgroundColor: '#255ECC',
    color: 'white',
    paddingLeft: 20,
  },

  dateTimeContainer: {
    marginBottom: 20,
  },
});

export default AppointmentBookingScreen;
