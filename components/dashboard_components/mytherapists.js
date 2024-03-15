import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
} from 'react-native';
import CustomButton from '../../assets/widgets/custom_button';

const TherapistListScreen = ({navigation}) => {
  const [therapists, setTherapists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ... (API integration or data fetching logic here)

  // Example API call using `fetch`:
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [
          {
            id: 1,
            name: 'John Doe',
            specialty: 'Psychologist',
            about:
              "Hello! I'm Dr. Rachel Anderson, a compassionate and dedicated therapist with over a decade of experience in mental health. My mission is to create a safe and non-judgmental space for individuals seeking support and healing.I specialize in helping clients navigate life's challenges, whether it's managing stress, coping with anxiety, overcoming trauma, or improving relationships. My therapeutic approach is client-centered, incorporating evidence-based techniques to tailor treatment to your unique needs.In our sessions, we'll work collaboratively to explore your thoughts, feelings, and goals. I believe in the power of self-discovery and personal growth, and I'm here to support you on your journey to a happier and more fulfilling life",
          },
          {
            id: 11,
            name: 'John Doe',
            specialty: 'Psychologist',
            about:
              "Hello! I'm Dr. Rachel Anderson, a compassionate and dedicated therapist with over a decade of experience in mental health. My mission is to create a safe and non-judgmental space for individuals seeking support and healing.I specialize in helping clients navigate life's challenges, whether it's managing stress, coping with anxiety, overcoming trauma, or improving relationships. My therapeutic approach is client-centered, incorporating evidence-based techniques to tailor treatment to your unique needs.In our sessions, we'll work collaboratively to explore your thoughts, feelings, and goals. I believe in the power of self-discovery and personal growth, and I'm here to support you on your journey to a happier and more fulfilling life",
          },
          {
            id: 2,
            name: 'John Doe',
            specialty: 'Psychologist',
            about:
              "Hello! I'm Dr. Rachel Anderson, a compassionate and dedicated therapist with over a decade of experience in mental health. My mission is to create a safe and non-judgmental space for individuals seeking support and healing.I specialize in helping clients navigate life's challenges, whether it's managing stress, coping with anxiety, overcoming trauma, or improving relationships. My therapeutic approach is client-centered, incorporating evidence-based techniques to tailor treatment to your unique needs.In our sessions, we'll work collaboratively to explore your thoughts, feelings, and goals. I believe in the power of self-discovery and personal growth, and I'm here to support you on your journey to a happier and more fulfilling life",
          },
          {
            id: 3,
            name: 'John Doe',
            specialty: 'Psychologist',
            about:
              "Hello! I'm Dr. Rachel Anderson, a compassionate and dedicated therapist with over a decade of experience in mental health. My mission is to create a safe and non-judgmental space for individuals seeking support and healing.I specialize in helping clients navigate life's challenges, whether it's managing stress, coping with anxiety, overcoming trauma, or improving relationships. My therapeutic approach is client-centered, incorporating evidence-based techniques to tailor treatment to your unique needs.In our sessions, we'll work collaboratively to explore your thoughts, feelings, and goals. I believe in the power of self-discovery and personal growth, and I'm here to support you on your journey to a happier and more fulfilling life",
          },
          {
            id: 4,
            name: 'John Doe',
            specialty: 'Psychologist',
            about:
              "Hello! I'm Dr. Rachel Anderson, a compassionate and dedicated therapist with over a decade of experience in mental health. My mission is to create a safe and non-judgmental space for individuals seeking support and healing.I specialize in helping clients navigate life's challenges, whether it's managing stress, coping with anxiety, overcoming trauma, or improving relationships. My therapeutic approach is client-centered, incorporating evidence-based techniques to tailor treatment to your unique needs.In our sessions, we'll work collaboratively to explore your thoughts, feelings, and goals. I believe in the power of self-discovery and personal growth, and I'm here to support you on your journey to a happier and more fulfilling life",
          },
          {
            id: 5,
            name: 'John Doe',
            specialty: 'Psychologist',
            about:
              "Hello! I'm Dr. Rachel Anderson, a compassionate and dedicated therapist with over a decade of experience in mental health. My mission is to create a safe and non-judgmental space for individuals seeking support and healing.I specialize in helping clients navigate life's challenges, whether it's managing stress, coping with anxiety, overcoming trauma, or improving relationships. My therapeutic approach is client-centered, incorporating evidence-based techniques to tailor treatment to your unique needs.In our sessions, we'll work collaboratively to explore your thoughts, feelings, and goals. I believe in the power of self-discovery and personal growth, and I'm here to support you on your journey to a happier and more fulfilling life",
          },
          {
            id: 6,
            name: 'John Doe',
            specialty: 'Psychologist',
            about:
              "Hello! I'm Dr. Rachel Anderson, a compassionate and dedicated therapist with over a decade of experience in mental health. My mission is to create a safe and non-judgmental space for individuals seeking support and healing.I specialize in helping clients navigate life's challenges, whether it's managing stress, coping with anxiety, overcoming trauma, or improving relationships. My therapeutic approach is client-centered, incorporating evidence-based techniques to tailor treatment to your unique needs.In our sessions, we'll work collaboratively to explore your thoughts, feelings, and goals. I believe in the power of self-discovery and personal growth, and I'm here to support you on your journey to a happier and more fulfilling life",
          },
          {
            id: 7,
            name: 'John Doe',
            specialty: 'Psychologist',
            about:
              "Hello! I'm Dr. Rachel Anderson, a compassionate and dedicated therapist with over a decade of experience in mental health. My mission is to create a safe and non-judgmental space for individuals seeking support and healing.I specialize in helping clients navigate life's challenges, whether it's managing stress, coping with anxiety, overcoming trauma, or improving relationships. My therapeutic approach is client-centered, incorporating evidence-based techniques to tailor treatment to your unique needs.In our sessions, we'll work collaboratively to explore your thoughts, feelings, and goals. I believe in the power of self-discovery and personal growth, and I'm here to support you on your journey to a happier and more fulfilling life",
          },
          {
            id: 8,
            name: 'John Doe',
            specialty: 'Psychologist',
            about:
              "Hello! I'm Dr. Rachel Anderson, a compassionate and dedicated therapist with over a decade of experience in mental health. My mission is to create a safe and non-judgmental space for individuals seeking support and healing.I specialize in helping clients navigate life's challenges, whether it's managing stress, coping with anxiety, overcoming trauma, or improving relationships. My therapeutic approach is client-centered, incorporating evidence-based techniques to tailor treatment to your unique needs.In our sessions, we'll work collaboratively to explore your thoughts, feelings, and goals. I believe in the power of self-discovery and personal growth, and I'm here to support you on your journey to a happier and more fulfilling life",
          },
          {
            id: 9,
            name: 'John Doe',
            specialty: 'Psychologist',
            about:
              "Hello! I'm Dr. Rachel Anderson, a compassionate and dedicated therapist with over a decade of experience in mental health. My mission is to create a safe and non-judgmental space for individuals seeking support and healing.I specialize in helping clients navigate life's challenges, whether it's managing stress, coping with anxiety, overcoming trauma, or improving relationships. My therapeutic approach is client-centered, incorporating evidence-based techniques to tailor treatment to your unique needs.In our sessions, we'll work collaboratively to explore your thoughts, feelings, and goals. I believe in the power of self-discovery and personal growth, and I'm here to support you on your journey to a happier and more fulfilling life",
          },
          {
            id: 10,
            name: 'John Doe',
            specialty: 'Psychologist',
            about:
              "Hello! I'm Dr. Rachel Anderson, a compassionate and dedicated therapist with over a decade of experience in mental health. My mission is to create a safe and non-judgmental space for individuals seeking support and healing.I specialize in helping clients navigate life's challenges, whether it's managing stress, coping with anxiety, overcoming trauma, or improving relationships. My therapeutic approach is client-centered, incorporating evidence-based techniques to tailor treatment to your unique needs.In our sessions, we'll work collaboratively to explore your thoughts, feelings, and goals. I believe in the power of self-discovery and personal growth, and I'm here to support you on your journey to a happier and more fulfilling life",
          },

          // Add more therapists as needed
        ];
        // const response = await fetch('https://your-api-endpoint');
        // const data = await response.json();
        setTherapists(data); // Or your API's specific structure
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInteractPress = therapist => {
    // Handle interaction logic here:
    // - Navigate to a chat screen
    // - Open a video call
    // - Send a message
    // - Show more information
    navigation.navigate('TherapistDetailsScreen', {therapist}); // Example navigation
  };

  const renderTherapist = ({item}) => (
    <TouchableOpacity
      style={styles.therapistItem}
      onPress={() => handleInteractPress(item)}>
      <View style={styles.therapistInfo}>
        <Text style={styles.therapistName}>{item.name}</Text>
        <Text style={styles.therapistSpecialty}>{item.specialty}</Text>
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
        <CustomButton
          onPress={null}
          title="Retry"
          buttonStyle={{
            backgroundColor: 'black',
            width: Dimensions.get('window').width * 0.5,
            alignItems: 'center',
          }}
          textStyle={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={therapists}
        renderItem={renderTherapist}
        keyExtractor={item => item.id || item.someUniqueIdentifier}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  therapistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  therapistInfo: {
    flex: 1,
  },
  therapistName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  therapistSpecialty: {
    fontSize: 16,
    color: '#888',
  },
  interactButton: {
    fontSize: 16,
    color: '#007bff',
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
});

export default TherapistListScreen;
