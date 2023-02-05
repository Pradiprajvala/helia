import { createContext, useReducer } from "react";

export const initialState = { screen: "home", removeBookmarkModal: {
    isVisible: false,
    hotel: undefined,
}};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SCREEN":
        return { ...state, screen: action.payload };
        
        case "SET_REMOVE_BOOKMARK_MODAL":
        return { ...state, removeBookmarkModal: action.payload };

        case "REMOVE_BOOKMARK": 
        default:
        return state;
    }
}

const useScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [ state, dispatch ];
};

