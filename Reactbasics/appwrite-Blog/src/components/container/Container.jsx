import React from 'react'

//container is a box where we define styling properties..


function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
    {children}
    </div>
  )
}

export default Container
