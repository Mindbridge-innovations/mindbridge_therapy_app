// utils/contexts/UserProvider.js
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import UserContext from './userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../config';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      try {
        const response = await fetch(`${Config.BACKEND_API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          setUser(result);
          console.log('Fetched user data:', result);//log it
        } else {
          console.error('Error fetching user data:', result);
          await AsyncStorage.removeItem('userToken');
          // Handle navigation to the login screen if needed
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        await AsyncStorage.removeItem('userToken');
        // Handle navigation to the login screen if needed
      }
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
