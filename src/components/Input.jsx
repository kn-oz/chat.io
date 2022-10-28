import { useContext, useState } from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import {v4 as uuid} from 'uuid'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db, storage } from '../firebase'


export default function Input() {

  const [text, setText] = useState('')
  const [img, setImg] = useState(null)
  const {user} = useContext(AuthContext)
  const {selectedUser} = useContext(ChatContext)

  const handleSend = async (e) => {
    e.preventDefault()
    
    if (!(text.trim() === '' && !img)) {
      if (img) {
        const storageRef = ref(storage, uuid())
        const uploadTask = uploadBytesResumable(storageRef, img)
        uploadTask.on(
          (error) => console.log(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
              await updateDoc(doc(db, 'chats', selectedUser.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  senderId: user.uid,
                  text,
                  img: downloadURL,
                  date: Timestamp.now(),
                }),
                updatedAt: serverTimestamp(),
              });
            });
          }
        );
      } else {
        await updateDoc(doc(db, 'chats', selectedUser.chatId), {
          messages: arrayUnion({
            id: uuid(),
            senderId: user.uid,
            text,
            date: Timestamp.now(),
          }),
        });
      }
  
      await updateDoc(doc(db, "users-chats", user.uid), {
        [selectedUser.chatId + ".lastMessage"]: {
          text,
        },
        [selectedUser.chatId + ".date"]: serverTimestamp(),
      });
  
      await updateDoc(doc(db, 'users-chats', selectedUser.user.uid), {
        [selectedUser.chatId + '.lastMessage']: {text},
        [selectedUser.chatId + '.lastMessageDate']: serverTimestamp(),
      });
  
      setText('');
      setImg(null);
    }


  }

  return (
    <div className='input h-12 bg-darkerblack p-3 flex items-center justify-between'>
      <input className='w-full bg-transparent border-none outline-none text-white text-md placeholder:text-gray' type="text" name="" id="" placeholder='Type something...' onChange={(e) => setText(e.target.value)} value={text}/>
      <div className="send flex gap-3 items-center">
       <img src={Attach} alt="" className="h-8 cursor-pointer" /> 
       <label htmlFor="file">
        <img src={Img} alt="" className='h-8 w-20 cursor-pointer'/>
       </label>
       <input type="file" name="" id="file" className='hidden' onChange={(event) => setImg(event.target.files[0])}/>
       <button onClick={handleSend} className='border-none px-2 py-1 text-white bg-purple hover:bg-purpledark cursor-pointer rounded-md'>Send</button>
      </div>
    </div>
  )
}

