import { useState, useContext, useEffect } from "react";
import {doc, onSnapshot} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";
import { db } from "../firebase";


export default function Chats() {

  const [chats, setChats] = useState([]);

  const {user} = useContext(AuthContext);
  //console.log(Object.keys(user));
  const {dispatch} = useContext(ChatContext);
  //console.log(dispatch);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "users-chats", user.uid), (doc) => {
        //console.log(Object.entries(doc.data()));
        setChats(doc.data());
      });
      return unsub;
    };
    user.uid && getChats();
  }, [user.uid]);

  const handleSelect = (chat) => {
    dispatch({type: "CHANGE_USER", payload: chat});
  };

  return (
    <div className="Chats">
      {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(chat => (
        <div className="user-chat p-3 flex items-center gap-3 text-white cursor-pointer hover:bg-gray" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
        <img
          className="w-12 h-12 rounded-[50%] object-cover"
          src={chat[1].userInfo.photoURL}
          alt="user-photo"
        />
        <div className="user-chat-info">
          <span className="text-lg font-medium">{chat[1].userInfo.displayName}</span>
          <p className="text-md text-slate">{chat[1].lastMessage?.text}</p>
        </div>
      </div>
      ))}
    </div>
  );
}
