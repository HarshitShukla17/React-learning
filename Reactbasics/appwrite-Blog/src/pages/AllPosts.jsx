import React,{useEffect,useState} from 'react'
import databaseService from '../appwrite/config'
import { Container,PostCard } from "../components"
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, logOut } from "../store/postThunkSlice";
import { logout } from "../store/authSlice";



function AllPosts() {
     const [posts,setPosts]=useState([])
    const dispatch = useDispatch();
     const userData = useSelector((state) => state.auth.userData);

  
  

    useEffect(()=>{
        databaseService.getAllPosts([]).then((posts)=>{
            if(posts)
            {
                setPosts(posts.documents)
            }
        })
         // if load is undefined or epmty and user authenticate than it will run
        
        
    },[posts])
    
  
    if (posts && userData.$id) {
      return (
        <div className="w-full py-8">
          <Container>
            <div className="flex flex-wrap">
              {posts.map((post) => (
                <div key={post.$id} className="p-2 w-1/4">
                  {
                    <PostCard
                      $id={post.$id}
                      title={post.title}
                      featuresImage={post.featuresImage}
                    />
                  }
                </div>
              ))}
            </div>
          </Container>
        </div>
      );
    }
  }
  
  


export default AllPosts
