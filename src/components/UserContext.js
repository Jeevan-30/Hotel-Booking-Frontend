
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [UserId, setUserId] = useState('');

    return (
      <UserContext.Provider value={{ UserId,setUserId }}>
        {children}
      </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
