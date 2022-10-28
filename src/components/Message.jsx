import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Message({ message }) {
  const { user } = useContext(AuthContext);
  const { selectedUser } = useContext(ChatContext);

  const messageRef = useRef(null);

  //console.log(message)

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={messageRef} className={`message flex gap-5 mb-5 ${message.senderId === user.uid ? 'flex-row-reverse' : ''}`}>
      <div className="message-info flex flex-col text-black font-light">
        <img
          src={message.senderId === user.uid ? user.photoURL : selectedUser.user.photoURL}
          alt=""
          className="h-8 w-8 rounded-[50%]"
        />
        <span className="text-black">{}</span>
      </div>
      <div className={`message-content max-w-4/5 flex flex-col gap-3 ${message.senderId === user.uid ? 'items-end' : ''}`}>
        <p className={`px-1 py-2 ${message.senderId === user.uid ? 'bg-blue text-white rounded-l-xl rounded-br-xl' : 'bg-white rounded-r-xl rounded-bl-xl'}`}>{message.text}</p>
        { message.img && <img src={message.img} alt="message-image" className="w-1/2" /> }
      </div>
    </div>
  );
}
