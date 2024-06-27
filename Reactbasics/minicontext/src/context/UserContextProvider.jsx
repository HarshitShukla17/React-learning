import React, { useState } from 'react'
import UserContext from './UserContext'

const UserContextProvider=({children})=> {
    const [user,setUser]=useState(null)
  return (
    // value={{user,setUser} defines that access is provided on which variables..
    //so here we are providing access of an objects which contains multiple things..
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
