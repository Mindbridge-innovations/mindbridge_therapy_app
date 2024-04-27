import React, { useState } from 'react';
import { View, Text, Button,TextInput } from 'react-native';
import { Rating } from 'react-native-ratings';
import CustomButton from '../../assets/widgets/custom_button';
import mystyles from '../../assets/stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../config';
import { useNavigation } from '@react-navigation/native';

const RateTherapistScreen = ({therapistId}) => {
  const [rating, setRating] = useState(1); // Default rating
  const [review,setReview]=useState(''); //review state value
  const navigation=useNavigation();

  const handleRatingSubmit = async () => {
    const ratingData={
      rating:rating,
      review:review,
      therapistId:therapistId,
    }
    const token = await AsyncStorage.getItem('userToken');

   console.log(ratingData)
   
    try {
      // Replace 'http://your-backend-url.com' with your actual backend URL
      const response = await fetch(`${Config.BACKEND_API_URL}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(ratingData),
      });

      const result = await response.json();

      if (response.ok) {
        // Handle successful registration
        alert(
          'Doctor/therapist rating completed succssfully!',
        );
        navigation.navigate('TherapistDetailsScreen',{passedUser});
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
    <View>
      <Text style={{color:'white', fontSize:18,textAlign:'center'}}>Please rate your therapist:</Text>
      <Rating
        showRating
        onFinishRating={setRating}
        startingValue={rating}
        type="star"
        ratingCount={5}
        imageSize={50}
        // ratingBackgroundColor="#257DE9"
        style={{ paddingVertical: 20 }}
      />
       <View style={mystyles.inputcontainer}>
                  <Text style={mystyles.label}>
                    Provide a short review about the therapist.
                  </Text>
                  <TextInput
                    style={mystyles.input}
                    value={review}
                    onChangeText={setReview
                    }
                    numberOfLines={4}
                    maxLength={300}
                    multiline
                  />
                </View>
            <CustomButton
              onPress={handleRatingSubmit}
              title="Submit rating"
              textStyle={{color: 'white', fontWeight: 'bold'}}
            />
        </View>
  );
};

export default RateTherapistScreen;