import axios from "axios";
import React, { useReducer, useEffect, createContext } from "react";
import { initialState, reducer } from "../reducers/auth_reducer";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (state.authToken) {
      axios
        .get(`http://localhost:5000/api/v1/auth/about`, {
          headers: { Authorization: `Bearer ${state.authToken}` },
        })
        .then((res) => dispatch({ type: "GET_USER", payload: res.data.data }))
        .catch((err) => console.log(err));
    }
  }, [state.authToken]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
