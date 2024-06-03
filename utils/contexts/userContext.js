// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {}
});

export const useUserContext = () => useContext(UserContext);

export default UserContext;