import React from 'react'
import ReactDOM from 'react-dom/client'
import Root ,{dloader,action as rootaction}from './routes/root'
import './index.css'
import {RouterProvider,createBrowserRouter,} from 'react-router-dom'
import ErrorPage from './error-page'
import Contact,{dloader as contactloader,action as contactaction} from './routes/contact'
import EditContact ,{action as editaction}from './routes/edit'
import {action as destroyaction} from './routes/destroy'
import Index from './routes'

const router=createBrowserRouter([
  {
    path:"/",
    element:<Root />,
    errorElement:<ErrorPage/>,
    loader:dloader,
    action:rootaction,
    children: [
      {index:true,element:<Index/>},
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader:contactloader,
        action:contactaction,
      },
      {
        path:"contacts/:contactId/edit",
        element:<EditContact/>,
        loader:contactloader,
        action:editaction
      },
      {
        path:"contacts/:contactId/destroy",
        action:destroyaction,
        errorElement: <div>Oops! There was an error.</div>,
      },
      
    ],

  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
