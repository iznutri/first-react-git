import { AuthContext } from 'context'
import About from 'pages/About'
import Error from 'pages/Error'
import Login from 'pages/Login'
import PostIdPage from 'pages/PostIdPage'
import Posts from 'pages/Posts'
import PostsScroll from 'pages/PostsScroll'
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
const AppRouter = () => {
   const { isAuth } = useContext(AuthContext)
   return (
      isAuth
         ?
         <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts_scroll" element={<PostsScroll />} />
            <Route path="/post/:id" element={<PostIdPage />} />
            <Route path="*" element={<Error />} />
            {/* редирект */}
            {/* {<Route path="*" element={<Navigate to="/error" />} />} */}
         </Routes >
         :
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
         </Routes >
   )
}
export default AppRouter