import React, { createContext, useState, useContext } from 'react';

// Create the context
const LoginUserContext = createContext();

// Create a custom hook for easy access to the context
export const useLoginUserContext = () => useContext(LoginUserContext);

// Create the provider component
export const LoginUserProvider = ({ children }) => {
    const [User, setUser] = useState('');

    return (
        <LoginUserContext.Provider value={{ User, setUser }}>
            {children}
        </LoginUserContext.Provider>
    );
};
