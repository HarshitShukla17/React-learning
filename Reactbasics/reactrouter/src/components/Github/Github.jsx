import { list } from 'postcss';
import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
  //this is not optimised approach so to reduce lag use loader
  // const [data,setData]=useState([])
  
  // useEffect(()=>{
  //   fetch(`https://api.github.com/users/hs4713513`)
  //   .then((res)=>res.json())
  //   .then((data)=>{
  //     console.log(data)
  //     setData(data)
  //   })
  // },[])
  const data=useLoaderData()

  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
      Github Profile: {data.following}
      <img src={data.avatar_url} alt="Git picture" width={300}/>
    </div>
  )
}

export default Github
export const gitHubInfoLoader=async()=>{
  const response=await fetch(`https://api.github.com/users/HarshitShukla17`)
  return response.json()
}
