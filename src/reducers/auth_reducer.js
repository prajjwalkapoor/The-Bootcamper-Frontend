export const initialState = {
  authToken: window.localStorage.getItem("authToken") || false,
  user: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      window.localStorage.setItem("authToken", action.payload);
      return (state = { ...state, authToken: action.payload });
    case "LOGOUT":
      window.localStorage.removeItem("authToken");
      return (state = { ...state, authToken: "" });
    case "GET_USER":
      return (state = { ...state, user: action.payload });
    default:
      return state;
  }
};
