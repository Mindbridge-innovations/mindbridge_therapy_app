import React, { useState } from 'react';
import { View, Text, Button,TextInput } from 'react-native';
import { Rating } from 'react-native-ratings';
import CustomButton from '../../assets/utils/custom_button';
import mystyles from '../../assets/stylesheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../config';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-notifications';

const RateTherapistScreen = ({therapistId}) => {
  const [rating, setRating] = useState(1); // Default rating
  const [review,setReview]=useState(''); //review state value
  const navigation=useNavigation();
  const [isLoading,setLoading]=useState(false)

  const handleRatingSubmit = async () => {
    setLoading(true)
    const ratingData={
      rating:rating,
      review:review,
      therapistId:therapistId,
    }
    const token = await AsyncStorage.getItem('userToken');

   
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
        Toast.show("SUCCESS:", result.message,{
          type: "success",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        // navigation.navigate('TherapistDetailsScreen',{passedUser});
      } else {
        // Handle errors
        Toast.show("An error occured:", error.message,{
          type: "error",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
      }
    } catch (error) {
      // Handle network errors
      Toast.show("An error occured:", error.message,{
        type: "error",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
    }finally{
      setLoading(false)
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
              isLoading={isLoading}
            />
        </View>
  );
};

export default RateTherapistScreen;