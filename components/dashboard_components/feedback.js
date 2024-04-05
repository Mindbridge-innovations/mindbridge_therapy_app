import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import mystyles from '../../assets/stylesheet';
import CustomButton from '../../assets/widgets/custom_button';

const FeedbackForm = ({ patientId, onFeedbackSubmit }) => {
  const [feedback, setFeedback] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  
  const handleSelectFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf, // for PDF files
          DocumentPicker.types.docx, // for Word documents
        ],
      });
      setSelectedFile(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
      } else {
        Alert.alert('Error', 'Unable to select file');
      }
    }
  };


  const handleSubmitFeedback = async () => {
    const feedbackData={
        feedback:feedback,
        clientId:therapistId,
      }
      const token = await AsyncStorage.getItem('userToken');
  
     console.log(feedbackData)
     
      try {
        // Replace 'http://your-backend-url.com' with your actual backend URL
        const response = await fetch(`${Config.BACKEND_API_URL}/feedbacks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
  
          },
          body: JSON.stringify(feedbackData),
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
    <View style={{paddingHorizontal:20}}>
      <Text style={{color:'white', fontSize:17, textAlign:'center'}}>Provide feedback for your patient:</Text>
      <View style={mystyles.inputcontainer}>
      <TextInput style={mystyles.input}
        multiline
        placeholder="Write your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        numberOfLines={7}
      />
      </View>
      
      <CustomButton
            onPress={handleSelectFile}
            title="Select a file"
            textStyle={{color: 'white', fontWeight: 'bold'}}
        />

        <CustomButton
            onPress={handleSubmitFeedback}
            title="Submit feedback"
            textStyle={{color: 'white', fontWeight: 'bold'}}
        />
      {selectedFile && <Text style={{color:"blue",backgroundColor:'white'}}>{selectedFile.name}</Text>}
      
    </View>
  );
};

export default FeedbackForm;