import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mystyles from '../../assets/stylesheet';
import CustomButton from '../../assets/utils/custom_button';

const MyFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');

      try {
        const response = await fetch(`${Config.BACKEND_API_URL}/client/feedbacks`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFeedbacks(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch feedbacks:', error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading Feedbacks...</Text>
      </View>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No feedbacks found at the moment</Text>
      </View>
    );
  }

  return (
    <ScrollView style={mystyles.scrollViewContainer}>
      {feedbacks.map((item, index) => (
        <TouchableOpacity onPress={() => setExpandedIndex(expandedIndex === index ? null : index)} style={{marginTop:5}}>
          <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey', backgroundColor:'lightgrey'}}>
            <Text><Text style={styles.boldLabel}>Feedback provided by:</Text>  Dr. {item.therapistDetails ? `${item.therapistDetails.firstName} ${item.therapistDetails.lastName}` : 'Unknown'}</Text>
            <Text>
              <Text style={styles.boldLabel}>Feedback:</Text>
              {expandedIndex === index ? item.feedback.feedback : `${item.feedback.feedback.substring(0, 50)}...`}
            </Text>
            {item.feedback.fileUrl&& (
                <Text>1 file attached, click to download</Text>
                
            )}
            {expandedIndex === index && item.feedback.fileUrl && (
              <TouchableOpacity onPress={() => Linking.openURL(item.feedback.fileUrl)}>
                <CustomButton title={('Download document')} buttonStyle={style={marginBottom:-5, margin:10}}/>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default MyFeedbacks;

const styles = StyleSheet.create({
    boldLabel: {
      fontWeight: 'bold', 
      color: 'black'
    },
    downloadButton: {
      marginTop: 10,
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center'
    },
    downloadButtonText: {
      color: 'white',
      fontWeight: 'bold'
    }
  });