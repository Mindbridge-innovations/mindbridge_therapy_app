import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import mystyles from '../../assets/stylesheet';
import CustomButton from '../../assets/utils/custom_button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../config';
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6';
import { Toast } from 'react-native-toast-notifications';

const FeedbackForm = ({ patientId, onFeedbackSubmit }) => {
  const [feedback, setFeedback] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectFile = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.docx],
      });
      setSelectedFile(results[0]); // Assuming you want the first selected file
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
      } else {
        Alert.alert('Error', 'Unable to select file');
      }
    }
  };

  const getFileIcon = (file) => {
    if (!file) return null; // Check if file is null

    switch (file.type) {
      case 'application/pdf':
        return <FontAwesome6 name="file-pdf" size={30} color="red" />;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return <FontAwesome6 name="file-word" size={30} color="blue" />;
      default:
        return <FontAwesome6 name="file" size={30} color="grey" />;
    }
  };

  const handleSubmitFeedback = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('feedback', feedback);
    formData.append('clientId', patientId);
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
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        Toast.show("SUCCESS: Your feedback was saved successfully", {
          type: "success",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        onFeedbackSubmit(); // Call the callback to close the modal
      } else {
        Toast.show("Error", result.message, {
          type: "error",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
      }
    } catch (error) {
      Toast.show("Error", error.message, {
        type: "error",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      setFeedback('');
    }
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Text style={{ color: 'white', fontSize: 17, textAlign: 'center' }}>Provide feedback for your patient:</Text>
      <View style={mystyles.inputcontainer}>
        <TextInput
          style={mystyles.input}
          multiline
          placeholder="Write your feedback here..."
          value={feedback}
          onChangeText={setFeedback}
          numberOfLines={7}
        />
      </View>

      <Text style={{ color: 'white', fontSize: 16, paddingTop: 10 }}>If you would like to send a document instead, please attach a pdf or word file</Text>
      {selectedFile && (
        <View style={{ backgroundColor: 'lightgrey', borderRadius: 5, marginBottom: 10 }}>
          <View style={{ margin: 10, marginBottom: 0 }}>
            {selectedFile && getFileIcon(selectedFile)}
            {selectedFile && <Text style={{ color: 'white', marginTop: 15, fontWeight: 'bold' }}>{selectedFile.name}</Text>}
          </View>
        </View>
      )}

      <CustomButton
        onPress={handleSelectFile}
        title="Select a file"
        buttonStyle={{ backgroundColor: 'white' }}
        textStyle={{ color: 'blue', fontWeight: 'bold' }}
      />

      <CustomButton
        onPress={handleSubmitFeedback}
        title="Submit feedback"
        textStyle={{ color: 'white', fontWeight: 'bold' }}
        isLoading={isLoading}
      />
    </View>
  );
};

export default FeedbackForm;
