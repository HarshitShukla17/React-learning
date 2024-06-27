import { useContext,createContext } from "react";

export const TodoContext=createContext({
    todos:[
        {
            id:1,
            todo:"Todo msg",
            completed:false,
        }
    ],
    addTodo:(todo)=>{},
    updateTodo:(id,todo)=>{},
    deleteTodo:(id)=>{},
    toggleComplete:(id)=>{},
   
})


export const useTodo=()=>
{
    return useContext(TodoContext)//ham jab bhi use context use karenge tab tab hame ek context dena padega...
}

export const TodoProvider= TodoContext.Provider