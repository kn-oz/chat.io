import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

export default function Home() {
  return (
    <div className="home bg-black h-screen flex justify-center items-center">
      <div className="container w-3/4 h-5/6 border border-solid border-white rounded-lg flex overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}
