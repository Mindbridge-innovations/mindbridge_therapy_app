import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import mystyles from '../../assets/stylesheet';
import CustomButton from '../../assets/widgets/custom_button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../config';


//this form will only appear as a modal when requested
const FeedbackForm = ({patientId}) => {
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
    
    // Prepare data to be sent including file if selected
    const formData = new FormData();
    formData.append('feedback',feedback);
    formData.append('clientId',patientId);
    if (selectedFile) {
      formData.append('file', {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: selectedFile.type,
      });
    }
  
    const token = await AsyncStorage.getItem('userToken');
  
    try {
      const response = await fetch(`${Config.BACKEND_API_URL}/feedbacks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Ensure correct content type for FormData
        },
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Handle successful feedback submission
        alert('Feedback submitted successfully!');
        // Navigate to the appropriate screen
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

      <Text style={{color:'white', fontSize:16, paddingVertical:10}}>If you would like to send a document instead, please attach a pdf or word file</Text>
      
      <CustomButton
            onPress={handleSelectFile}
            title="Select a file"
            buttonStyle={{backgroundColor:'white'}}
            textStyle={{color: 'blue', fontWeight: 'bold'}}
        />

        <CustomButton
            onPress={handleSubmitFeedback}
            title="Submit feedback"
            textStyle={{color: 'white', fontWeight: 'bold'}}
        />
      {/* {selectedFile && <Text style={{color:"blue",backgroundColor:'white'}}>{selectedFile.name}</Text>} */}
      
    </View>
  );
};

export default FeedbackForm;

const MyFeedbacks=()=>{

}