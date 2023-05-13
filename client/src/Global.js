import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalloggedIn, setglobalLoggedIn] = useState(false);
  const [globalemail, setglobalEmail] = useState('');
  const [globalType, setGlobalType] = useState('');
  const [globalSubtype, setGlobalSubtype] = useState('');
  const [globalsearch, setGlobalserch] = useState(false);

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
      setGlobalserch(JSON.parse(globalsearch));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('globalloggedIn', JSON.stringify(globalloggedIn));
    localStorage.setItem('globalemail', JSON.stringify(globalemail));
    localStorage.setItem('globalType', JSON.stringify(globalType));
    localStorage.setItem('globalSubtype', JSON.stringify(globalSubtype));
    localStorage.setItem('globalsearch', JSON.stringify(globalsearch));
  }, [globalloggedIn, globalemail, globalType, globalSubtype, globalsearch]);

  return (
    <GlobalContext.Provider value={{ globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType, globalSubtype, setGlobalSubtype, globalsearch, setGlobalserch }}>
      {children}
    </GlobalContext.Provider>
  );
};
