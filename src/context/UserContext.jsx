import React, { useState, useEffect, createContext } from 'react';
import api from '../api';
import.meta.env.VITE_BASE_URL

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [frontendImage, setFrontEndImage] = useState("");
  const [backendImage, setBackEndImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [history, setHistory] = useState([]);
//handles current user
 

// get gemini 
const geminiResponse = async (command) => {
  try {
    console.log(command);
    const response = await api.post(
      "/assistant",
      { command }, 
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.error("Failed to get gemini", err);
  }
};

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const assistantImage = localStorage.getItem("assistantImage");
    if (storedUser) {
      setUser(storedUser);
      setFrontEndImage(assistantImage); 
    }
    // handleCurrentUser();

    const storedHistory = JSON.parse(localStorage.getItem('history')) || [];
    setHistory(storedHistory);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        frontendImage,
        setFrontEndImage,
        backendImage,
        setBackEndImage,
        selectedImage,
        setSelectedImage,
        geminiResponse,
        history, setHistory
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
