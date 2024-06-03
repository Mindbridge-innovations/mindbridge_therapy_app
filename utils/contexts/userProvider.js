// UserProvider.js
import React, { useState, useEffect, useCallback } from 'react';
import UserContext from './userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../config';
import { useNavigation } from '@react-navigation/native';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();

  const fetchUser = useCallback(async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      try {
        const response = await fetch(`${Config.BACKEND_API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();
        if (response.ok) {
          setUser(result);
          setIsAuthenticated(true);
        } else {
          console.error('Error fetching user data:', result.message);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = async () => {
    console.log("Logging out...");
    setUser(null);
    setIsAuthenticated(false);
    console.log("User cleared, navigating to SignInScreen...");
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignInScreen' }],
    });
    await AsyncStorage.clear();
  };

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;