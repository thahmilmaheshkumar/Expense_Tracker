import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isauth, setIsAuth] = useState(false);

  const auth = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tracker/tracker`,
        { withCredentials: true },
      );
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, isauth }}>
      {children}
    </AuthContext.Provider>
  );
};
