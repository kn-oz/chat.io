import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export default function Navbar() {
  const {user} = useContext(AuthContext);
  return (
    <div className='navbar flex items-center justify-between bg-black p-3 h-12 text-white'>
      <span className="logo font-bold">
        Chat.io
      </span>
      <div className="user flex items-center gap-3">
        <img className="bg-red-400 h-6 w-6 object-cover rounded-[50%]" src={user.photoURL} alt="user" />
        <span className="">{user.displayName}</span>
        <button onClick={() => signOut(auth)} className='bg-gray hover:bg-slate p-2 text-white hover:text-black text-xs border-none rounded-md cursor-pointer'>Log Out</button>
      </div>
    </div>
  )
}
