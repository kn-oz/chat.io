import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

export default function Sidebar() {
  return (
    <div className='sidebar w-1/3 bg-darkerblack relative'>
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}
