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
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import mystyles from '../../assets/stylesheet';

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

const formatDate = date => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const formatTime = time => {
  return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
};

export const DatePicker = ({isBackgroundBlue}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <View>
      <Text
        style={isBackgroundBlue ? mystyles.dashlabelWhite : mystyles.dashlabel}>
        Please select your suitable date for the appointment
      </Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={mystyles.dateTimeContainer}>
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
  );
};

export const TimePicker = ({isBackgroundBlue}) => {
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <View>
      <Text
        style={isBackgroundBlue ? mystyles.dashlabelWhite : mystyles.dashlabel}>
        Please select your suitable time for the appointment
      </Text>
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={mystyles.dateTimeContainer}>
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
  );
};
