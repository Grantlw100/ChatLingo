import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import Chat from './pages/chat';
import Settings from './pages/settings';
import About from './pages/about';
import Logout from './pages/logout';
import Help from './pages/help';
import ChatApp from './pages/react'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      },{
        path: '/chatapp',
        element: <ChatApp />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/profile',
        element: <Profile />
      }, {
        path: '/chat',
        element: <Chat />
      }, {
        path: '/settings',
        element: <Settings />
      }, {
        path: '/about',
        element: <About />
      }, {
        path: '/logout',
        element: <Logout />
      }, {
        path: '/help',
        element: <Help />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
