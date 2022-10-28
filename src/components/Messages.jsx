import {doc, onSnapshot} from 'firebase/firestore';
import React, {useContext, useEffect, useState} from 'react'
import {ChatContext} from "../context/ChatContext";
import { db } from '../firebase';
import Message from './Message';

export default function Messages() {

  const [messages, setMessages] = useState([]);
  const {selectedUser} = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", selectedUser.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return unsub;
  }, [selectedUser.chatId]);

  return (
    <div className='messages bg-black p-3 overflow-y-scroll' style={{height: 'calc(100% - 98px)'}}>
        {
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        }
    </div>
  )
}
