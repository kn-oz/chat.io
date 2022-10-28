import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function Login() {

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/chat.io');
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className="formContainer bg-black h-screen flex justify-center items-center">
        <div className="formWrapper bg-gray px-12 py-16 flex flex-col items-center gap-3 rounded-xl">
            <span className="logo text-3xl text-white font-bold">Chat.io </span>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input className='p-4 w-80 border-b border-blue placeholder:text-darkerblack focus:outline-none  focus:border-blue-400 focus:border focus:rounded-md' type="email" name="" id="" placeholder='email'/>
                <input className='p-4 w-80 border-b border-blue placeholder:text-darkerblack focus:outline-none  focus:border-blue-400 focus:border focus:rounded-md' type="password" name="" id="" placeholder='password'/>
                <button className='bg-purple hover:bg-purpledark text-white p-3 font-bold border-none cursor-pointer rounded-md'>Log In</button>
                {error && <span className='text-red'>Something went wrong</span>}
            </form>
            <p className='text-xs text-white m-3'>Don't have an account? <Link className='hover:text-purple' to='/register'>Register</Link></p>
        </div>
    </div>
  )
}
