import { useState } from 'react'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
import './App.css'
import './index.css'



function App() {
  

  return (
    <>
      <h1>Todolist using redux-toolkit</h1>
      <AddTodo/>
      <Todos/>
    </>
  )
}

export default App
