import React, { createContext, useState } from 'react';

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    const [adminId, setAdminId] = useState('');

    return (
      <AdminContext.Provider value={{ adminId,setAdminId }}>
        {children}
      </AdminContext.Provider>
    );
};

export { AdminProvider, AdminContext };
