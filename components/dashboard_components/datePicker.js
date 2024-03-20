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
import mystyles from '../../assets/stylesheet';




export const DatePicker = ({isBackgroundBlue,label,date,onDateChange}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [date, setDate] = useState(new Date());


   const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the picker
    if (selectedDate) {
      onDateChange(selectedDate); // Use the passed in onDateChange
    }
  };

  const formatDate = date => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };
  console.log(formatDate(date))

  return (
    <View>
      <Text
        style={isBackgroundBlue ? mystyles.dashlabelWhite : mystyles.dashlabel}>
          {label}
          
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

export const TimePicker = ({isBackgroundBlue,label}) => {
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const formatTime = time => {
    return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <View>
      <Text
        style={isBackgroundBlue ? mystyles.dashlabelWhite : mystyles.dashlabel}>
        {label}
         
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
