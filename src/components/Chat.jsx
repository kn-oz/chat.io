import React from 'react'
import { useContext } from 'react'
import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

export default function Chat() {
  const {selectedUser} = useContext(ChatContext);
  return (
    <div className='chat w-2/3'>
      <div className="chat-info h-12 bg-darkerblack flex justify-between items-center p-3 text-white">
        <span className="">{selectedUser?.user.displayName}</span>
        <div className="chat-icons flex gap-3">
          <img src={Cam} alt="" className="h-6 cursor-pointer" />
          <img src={Add} alt="" className="h-6 cursor-pointer" />
          <img src={More} alt="" className="h-6 cursor-pointer" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}
