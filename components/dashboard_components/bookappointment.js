import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Picker,
  DatePicker,
  ActivityIndicator,
  Alert,
} from 'react-native';

const BookAppointmentScreen = ({ navigation, route: { params: { therapist } } }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date().getTime()); // Initial placeholder
  const [appointmentType, setAppointmentType] = useState(null);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ... (API integration or data fetching logic for available appointment types based on therapist and date)

  // Example API call using `fetch`:
  useEffect(() => {
    const fetchAppointmentTypes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://your-api-endpoint/${therapist.id}/appointment-types?date=${date}`);
        const data = await response.json();
        setAppointmentTypes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (therapist) {
      fetchAppointmentTypes();
    }
  }, [therapist, date]);

  const handleBookAppointment = async () => {
    if (!appointmentType || !notes) {
      Alert.alert('Please fill in all required fields.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('https://your-api-endpoint/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          therapistId: therapist.id,
          date,
          time, // Convert time to ISO string or format expected by your API
          type: appointmentType,
          notes,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Appointment booked successfully!', `Your appointment ID is ${data.id}`);
        navigation.goBack(); // Or navigate to a confirmation screen
      } else {
        Alert.alert('Error booking appointment', data.error || 'An unknown error occurred.');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Error: {error}</Text>
        <Button title="Retry" onPress={fetchData} />
      </View>
    );
  }

  if (!therapist) {
    return (
      <View style={styles.container}>
        <Text>Therapist details not available. Please try again later.</Text>
      </View>
    );
  }

  // ... (Component structure rendering therapist details, date picker, time picker, appointment type picker, notes input, and book appointment button)

  return (
    <View style={styles.container}>
      {/* ... (Component structure) */}
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (Styles for various components)
});

export default BookAppointmentScreen;
