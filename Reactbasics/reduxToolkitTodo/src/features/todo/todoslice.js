//nanoid generates the unique id..
//steps:-
//1. import createSlice
//2. create initialstate
//3.create slice
   //3.a  give name to slice
   //put initial state
   //create reducers
   //export all reducers so they can be accessed individually..

import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState={
    todos:[{
        id:1,
        text:"hello world"
    }]
}

export const todoSlice=createSlice({
   name:"todo",
   initialState,
   reducers:{
    addTodo:(state,action)=>{
        const todo={
            id:nanoid(),
            text:action.payload,   
        }
        console.log(todo)
        state.todos.push(todo)

    },//state tells about current situation of initialstate and action tells values like id.. 
    removeTodo:(state,action)=>{
        state.todos=state.todos.filter((todo)=>todo.id!=action.payload)
    },
    //update has been not used yet..
    updateTodo:(state,action)=>{
       const {id,text}=action.payload
        state.todos=state.todos.filter((todo)=>todo.id==id?{...todo,text:text}:todo)
    }
   }
})
export const {addTodo,removeTodo,updateTodo}=todoSlice.actions
export default todoSlice.reducer

