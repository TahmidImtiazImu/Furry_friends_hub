import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalloggedIn, setglobalLoggedIn] = useState(false);
  const [globalemail, setglobalEmail] = useState('');
  const [globalType, setGlobalType] = useState('');
  const [globalSubtype, setGlobalSubtype] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('globalloggedIn');
    const email = localStorage.getItem('globalemail');
    const type = localStorage.getItem('globalType');
    const subtype = localStorage.getItem('globalSubtype');
    if (loggedIn && email && type && subtype) {
      setglobalLoggedIn(JSON.parse(loggedIn));
      setglobalEmail(JSON.parse(email));
      setGlobalType(JSON.parse(type));
      setGlobalSubtype(JSON.parse(subtype));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('globalloggedIn', JSON.stringify(globalloggedIn));
    localStorage.setItem('globalemail', JSON.stringify(globalemail));
    localStorage.setItem('globalType', JSON.stringify(globalType));
    localStorage.setItem('globalSubtype', JSON.stringify(globalSubtype));
  }, [globalloggedIn, globalemail, globalType, globalSubtype]);

  return (
    <GlobalContext.Provider value={{ globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType }}>
      {children}
    </GlobalContext.Provider>
  );
};
