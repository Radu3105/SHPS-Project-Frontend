import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("access_token")
    );

    const login = (token) => {
        localStorage.setItem("access_token", token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
};
