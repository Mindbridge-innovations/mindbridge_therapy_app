import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserVRInteractionsScreen = ({ route }) => {
  const { passedUser } = route.params;
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    setLoading(true);
    try {
        const token=await AsyncStorage.getItem('userToken')
      const response = await fetch(`${Config.BACKEND_API_URL}/interactions/${passedUser.userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch interactions');
      }
      const data = await response.json();
      if (Object.keys(data).length === 0) {
        setInteractions([]);
      } else {
        setInteractions(Object.values(data).map(interaction => ({
          ...interaction,
          date: new Date(interaction.timestamp).toLocaleDateString(),
          time: new Date(interaction.timestamp).toLocaleTimeString(),
        })));
      }
    } catch (error) {
      console.error('Failed to fetch interactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : interactions.length > 0 ? (
        <FlatList
          data={interactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.text}>Interaction #{index + 1}</Text>
              <Text style={styles.text}>Object interacted with: {item.object}</Text>
              <Text style={styles.text}>Date: {item.date}</Text>
              <Text style={styles.text}>Time: {item.time}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>This user has no VR interactions yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default UserVRInteractionsScreen;