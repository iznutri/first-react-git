import PostService from 'API/PostService'
import Loader from 'components/UI/Loader/Loader'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'

const PostIdPage = () => {
   const params = useParams()
   const [post, setPost] = useState({})
   const [comments, setComments] = useState([])
   const [fetchPostById, isLoading] = useFetching(async (id) => {
      const response = await PostService.getById(id)
      setPost(response.data)
   })
   const [fetchComments, isComLoading] = useFetching(async (id) => {
      const response = await PostService.getCommentsByPostId(id)
      setComments(response.data)
   })
   useEffect(() => {
      fetchPostById(params.id)
      fetchComments(params.id)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div style={{ width: '700px', }}>
         <h1>Вы попали на страницу поста {params.id}</h1>
         {isLoading
            ? <Loader />
            : <div>{post.id}. <b>{post.title}</b><br />{post.body}</div>
         }
         <h1>
            Комментарии
         </h1>
         {isComLoading
            ? <Loader />
            : <div><br />
               {comments.map(comm =>
                  <div key={comm.id}>
                     <h4>{comm.name}</h4>
                     <h5>{comm.email}</h5>
                     <div>{comm.body}</div>
                     <br />
                  </div>
               )}
            </div>
         }
      </div>
   )
}
export default PostIdPage 