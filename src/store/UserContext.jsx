/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const UserContextStates = {
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {}
};

const UserContext = createContext(UserContextStates);


const useUserContext = () => {
  return useContext(UserContext);
}

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userContextValue = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};

export { useUserContext, UserContextProvider };
