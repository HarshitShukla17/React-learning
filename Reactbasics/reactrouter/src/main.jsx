import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'

import About from './components/About/About.jsx'
import ContactUs from './components/ContactUs/ContactUs.jsx'
import User from './components/User/User.jsx'

import { Route, RouterProvider,  createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Github, { gitHubInfoLoader } from './components/Github/Github.jsx'


//first way to create router...

// const router=createBrowserRouter([
//   {
//     path:'/',
//     element:<Layout />,
//     children:[
//       {
//         path:"",
//         element:<Home />
//       },
//       {
//         path:"about",
//         element:<About />

//       },
//       {
//         path:"ContactUs",
//         element:<ContactUs/>
//       }
//     ]
//   }
// ])

//second way to create router..

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path=''element={<Home/>}></Route>
      <Route path='about'element={<About/>}></Route>
      <Route path='ContactUs'element={<ContactUs/>}></Route>
      <Route path='user/:userid'element={<User/>}></Route>
      <Route //loader is used here to make direct api call to reduce lag..
      loader={gitHubInfoLoader} 
      path='github'
      element={<Github/>}>

      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
