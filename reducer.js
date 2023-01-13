import { createContext, useReducer } from "react";

export const initialState = { screen: "home" };

export const reducer = (state, action) => {
    console.log('action' , action, action.payload)
    switch (action.type) {
        case "SET_SCREEN":
        return { ...state, screen: action.payload };
        default:
        return state;
    }
}

const useScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [ state, dispatch ];
};

