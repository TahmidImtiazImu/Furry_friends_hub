import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalloggedIn, setglobalLoggedIn] = useState(false);
  const [globalemail, setglobalEmail] = useState('');
  const [globalType, setGlobalType] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('globalloggedIn');
    const email = localStorage.getItem('globalemail');
    if (loggedIn && email) {
      setglobalLoggedIn(JSON.parse(loggedIn));
      setglobalEmail(JSON.parse(email));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('globalloggedIn', JSON.stringify(globalloggedIn));
    localStorage.setItem('globalemail', JSON.stringify(globalemail));
    localStorage.setItem('globalType', JSON.stringify(globalType))
  }, [globalloggedIn, globalemail, globalType]);

  return (
    <GlobalContext.Provider value={{ globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType }}>
      {children}
    </GlobalContext.Provider>
  );
};
