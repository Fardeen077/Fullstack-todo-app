import { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // login user 

  const login = (userData, token) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem("token", token);
  }

  // logout user

  const logout = () => {
    setUser(null);
    setToken(""); // clear token
    localStorage.removeItem("token");
  }

  // if token change save user in lovcalstorage

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  )
}

// export const userAuth = useContext(AuthContext);
