import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [roles, setRoles] = useState(localStorage.getItem("roles"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [exp, setExp] = useState(parseInt(localStorage.getItem("exp")));
  
  const isExpired = () => {
    const localStorageExp = localStorage.getItem("exp");
    if (localStorageExp && new Date(localStorageExp) < Date.now()) {
      alert("Access denied.")
      setUsername(null);
      setRoles(null);
      setUserId(null);
      setExp(null);
      localStorage.clear();
    }
  }

  return (
    <UserContext.Provider value={{
        isExpired,
        usernameState: [username, setUsername],
        rolesState: [roles, setRoles],
        userIdState: [userId, setUserId],
        expState: [exp, setExp]
    }}>
      {props.children}
    </UserContext.Provider>
  );
};