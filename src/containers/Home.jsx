import React, { useState, useRef, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom'

import { Sidebar } from '../components'
import { client } from '../client'
import logo from '../assets/logo.png'
import Pins from './Pins'

import { userQuery } from '../utils/data'
import { fetchUser } from '../utils/fetchUser'

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState(null)
  const scrollRef = useRef(null)

  // const userInfo = localStorage.get("user") !== 'undefined'?JSON.parse(localStorage.get("user")) : localStorage.clear() // clear when something went wrong like user token expired

  const userInfo = fetchUser()

  useEffect(() => {
    const query = userQuery(userInfo?.uid)
    client.fetch(query)
    .then((data)=>{
      setUser(data[0])
    })
  },[])

  useEffect(() => {
    scrollRef.current.scrollTo(0,0)
  },[])

  return (
    <div className="flex bg-grey-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      {/* for medium and larger devices*/ }
      {/* flex initial means items don't grow when there is extra space */}
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user&&user}/>
      </div>
      {/* for devices smaller than medium*/}
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={()=>setToggleSidebar(true)}/>
          <Link to="/">
            <img src={logo} alt="logo" className="w-28"/>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-28"/>
          </Link>
        </div>
      {toggleSidebar&&(
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onCLick={()=>setToggleSidebar(false)}/>
          </div>
          <Sidebar user={user&&user} closeToggle={setToggleSidebar}/>
        </div>
      )}
      </div>
      <div className="pb-2 flex-1 h-screen y-overflow-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/*" element={<Pins user={user&&user}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Home