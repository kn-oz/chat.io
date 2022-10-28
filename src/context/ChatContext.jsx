import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            user.uid > action.payload.uid
              ? user.uid + action.payload.uid
              : action.payload.uid + user.uid,
        };
      default:
        return state;
    }
  };
  
  const { user } = useContext(AuthContext);
  const [chat, dispatch] = useReducer(chatReducer, {
    user: {},
    chatId: "null",
  });

  

  return (
    <ChatContext.Provider value={{ selectedUser: chat, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
