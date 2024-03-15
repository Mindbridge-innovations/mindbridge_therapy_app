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
import CustomButton from '../../assets/widgets/custom_button';
import mystyles from '../../assets/stylesheet';
import {Picker} from '@react-native-picker/picker';
import {DatePicker, TimePicker} from './datePicker';

const AppointmentBookingScreen = ({isBackgroundBlue}) => {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const [selectedValue, setSelectedValue] = useState(''); // Set the initial selected value

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
      <View style={{width: '100%'}}>
        <Text style={styles.title}>Book a Therapy Session</Text>
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
        <DatePicker isBackgroundBlue={false} />
        <TimePicker />

        <View style={{marginBottom: 20}}>
          <Text style={mystyles.dashlabel}>
            What is the reason for your appointment
          </Text>
          <View style={mystyles.dashinput}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
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
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="Choose your preference" value="" />
              <Picker.Item
                label="Physical (in office)"
                value="Physical (in office)"
              />
              <Picker.Item label="Video call" value="Video call" />
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
    fontSize: 22,
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
