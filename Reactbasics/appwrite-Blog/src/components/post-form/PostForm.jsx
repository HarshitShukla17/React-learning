import React,{useCallback,useState} from 'react'

import { useForm } from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import  databaseService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";






function PostForm({post}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  
  
  

  const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
    defaultValues:{
      title:post?.title||'',
      slug:post?.slug||'',
      content:post?.content||'',
      status:post?.status||'active'
    }
  })
  
  const submit=async(data)=>{
    if(post)
    {
      const file=data.image?databaseService.uploadFile(data.image[0]):null
      if(file){
        databaseService.deleteFile(post.featuresImage)
      }
      const dbPost=await databaseService.updatePost(post.$id,{...data,
      featuresImage:file?file.$id:undefined})
      if (dbPost)
      {
        
        
        navigate(`/post/${dbPost.$id}`)
      }
    }
    else{
      console.log("else part")
      const file=await databaseService.uploadFile(data.image[0])  
      // todo handle if image is not given
      if(file)
      {
        
        const fileId=file.$id
        data.featuresImage=fileId
        console.log(data.featuresImage)
        const dbPost=await databaseService.createPost({...data,userId:userData.$id})
        console.log(dbPost)
        dispatch(addPost(dbPost))
        navigate(`/post/${dbPost.$id}`)

      }
    }
  }

  const slugTransform=useCallback((value)=>{
    if(value&&typeof value==='string')
    {
      return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g,'-')
      .replace(/\s/g,'-')
    }
    return ''
  },[])
  React.useEffect(()=>{
    // console.log("useEffect postForm status: ", status);
    // if (status === "loading") {
    //   // console.log("useEffect postForm status: ", status);
    // } else if (status === "succeeded" && error === null && loading) {
    //   // Move the navigation logic here
    //   console.log("useEffect postForm status: ", status);
    //   console.log("Navigating to /all-posts");

    //   navigate("/all-posts");
    // } else if (status === "failed") {
    //   console.error("Submission failed:", error);
    // }
    const subscription=watch((value,{name})=>{
      if(name==="title")
      {
        setValue("slug",slugTransform(value.title,{shouldValidate:true}))
      }
    })
    return ()=>{
      subscription.unsubscribe()
    }
  },[watch,slugTransform,setValue,])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={databaseService.getFilePreview(post.featuresImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className={`w-full `}>
                  {/* // disabled={status === "loading"}  */}
                     {post ? "Update" : "Submit"} 
                    {/* // {status === "loading"
                    //   ? "Submitting..."
                    //   : post
                    //   ? "Update"
                    //   : "Submit"} */}
                </Button>
                
            </div>
        </form>
  )
}

export default PostForm
