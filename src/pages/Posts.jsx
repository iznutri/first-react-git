import React, { useEffect, useState } from 'react'
import PostList from 'components/PostList';
import MyButton from 'components/UI/button/MyButton';
import MyModal from 'components/UI/MyModal/MyModal';
import PostForm from 'components/PostForm';
import PostFilter from 'components/PostFilter';
import Loader from 'components/UI/Loader/Loader';
import Pagination from 'components/UI/pagination/Pagination';
import { getPageCount } from 'utils/pages';
import PostService from 'API/PostService';
import { useFetching } from 'hooks/useFetching';
import { usePosts } from 'hooks/usePosts';


function Posts() {
  const [posts, setPosts] = useState([])

  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)



  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getALL(limit, page)
    setPosts(response.data)
    const totalCount = (response.headers['x-total-count'])
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts(limit, page)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className="App" >
      <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal} >
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: '15px 0', borderTop: '0px' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }
      {
        isPostsLoading
          ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}><Loader /></div>
          : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS' />
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />

    </div >
  );
}

export default Posts; 