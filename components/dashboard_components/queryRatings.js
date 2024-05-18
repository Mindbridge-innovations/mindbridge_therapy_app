import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import Config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mystyles from '../../assets/stylesheet';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MyRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);  // Start loading
      const token = await AsyncStorage.getItem('userToken');

      try {
        const response = await fetch(`${Config.BACKEND_API_URL}/therapist/ratings`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRatings(data);
        setLoading(false);  // Stop loading after data is fetched
      } catch (error) {
        console.error('Failed to fetch ratings:', error);
        setLoading(false);  // Stop loading if there is an error
      } 
    };

    fetchRatings();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading Ratings...</Text>
      </View>
    );
  }

  if (ratings.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No ratings found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={mystyles.scrollViewContainer}>
      {ratings.map((item, index) => (
        <TouchableOpacity onPress={() => setExpandedIndex(expandedIndex === index ? null : index)} style={{marginTop:5}}>
        <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey' , backgroundColor:'lightgrey'}}>
          <Text><Text style={styles.boldLabel}>Rated by:</Text> {item.clientDetails ? `${item.clientDetails.firstName} ${item.clientDetails.lastName}` : 'Unknown'}</Text>
          <Text><Text style={styles.boldLabel}>Rating:</Text> {item.rating.rating}/5</Text>
          <Text>
            <Text style={styles.boldLabel}>Review:</Text>
            {expandedIndex === index ? item.rating.review : `${item.rating.review.substring(0, 50)}...`}
           </Text>       
        </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const styles=StyleSheet.create({
    boldLabel:{
    fontWeight:'bold', color:'black'
    }
}
);

export default MyRatings;