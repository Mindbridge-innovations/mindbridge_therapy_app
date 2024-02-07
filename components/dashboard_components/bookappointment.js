import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../assets/widgets/custom_button';
import mystyles from '../../assets/stylesheet';
import { Picker } from '@react-native-picker/picker';

const AppointmentBookingScreen = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedValue, setSelectedValue] = useState(''); // Set the initial selected value


  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };



  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const formatTime = (time) => {
    return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleBookingSubmit = () => {
    // Logic to handle form submission, including validation and sending data to your backend
    console.log({
      date: formatDate(date),
      time: formatTime(time),
      reason,
      description,
    });
  };

  return (
    <ScrollView contentContainerStyle={mystyles.dashviewcontainer}>
      <View style={{ width:'100%' }}>
      <Text style={styles.title}>Book a Therapy Session</Text>
      </View>

      <Text style={{ width:'90%', color:'black', fontSize:16, fontWeight:'bold', marginBottom:20 }}>Please note that your therapist or doctor may reschedule this appointment to fit his/her time schedule. You will be informed of such!</Text>

      <View style={{ width:'90%' }}>
      
      <View>
      <Text style={mystyles.dashlabel}>Please select your suitable date for the appointment</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateTimeContainer}>
        <TextInput
          style={mystyles.dashinput}
          placeholder="Select Date"
          value={formatDate(date)}
          editable={false} // Prevent manual editing
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      </View>

      <View>
      <Text style={mystyles.dashlabel}>Please select your suitable time for the appointment</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateTimeContainer}>
        <TextInput
          style={mystyles.dashinput}
          placeholder="Select Time"
          value={formatTime(time)}
          editable={false} // Prevent manual editing
        />
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
      </View>

      <View style={{ marginBottom:20 }}>
        <Text style={mystyles.dashlabel}>
          What is the reason for your appointment
        </Text>
        <View style={mystyles.dashinput}>
        <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) =>setSelectedValue(itemValue)} >
          <Picker.Item label="Choose your preference" value="" />
          <Picker.Item label="Marriage and Family Therapy" value="Marriage and Family Therapy" />
          <Picker.Item label="Substance Abuse Counseling" value="Substance Abuse Counseling" />
          <Picker.Item label="Trauma and PTSD Treatment" value="Trauma and PTSD Treatment" />
          <Picker.Item label="Anxiety or Depression Counseling" value="Anxiety or Depression Counseling" />
          <Picker.Item label="Child and Adolescent Therapy" value="Child and Adolescent Therapy" />
          <Picker.Item label="LGBTQ+ Counseling" value="LGBTQ+ Counseling" />
          <Picker.Item label="Career Counseling" value="Career Counseling" />

        </Picker>
        </View>
      </View>


      <View >
        <Text style={ mystyles.dashlabel }>Please describe briefly the need for this appointment</Text>
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

      <CustomButton
          onPress={handleBookingSubmit}
          title="Book Appointment"
          buttonStyle={{ backgroundColor: 'black', padding: 10, borderRadius: 15,marginTop:20 }}
          textStyle={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign:'center' }}
          />
          </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    backgroundColor:'#255ECC',
    color:'white',
    paddingLeft:20
  },
  
  dateTimeContainer: {
    marginBottom: 20,
  },
});

export default AppointmentBookingScreen;