import React,{useEffect,useState} from 'react'
import { PostForm,Container } from '../components'
import databaseService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EditPost() {
  const [post,setPost]=useState(null)
  const {slug}=useParams()
  
  const navigate=useNavigate()

  useEffect(()=>{
    if(slug)
    {
      databaseService.getPost(slug).then((post)=>{
        if(post)
        {
          setPost(post)
        }
        else{
          navigate("/")
        }
      })
      
    }
  },[slug,navigate])
  return post?(
    <div className='py-8'>
      <Container>
        <PostForm post={post}/>
      </Container>
    </div>
  ):null
}

export default EditPost
