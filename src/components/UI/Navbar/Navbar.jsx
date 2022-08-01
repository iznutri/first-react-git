import { AuthContext } from 'context'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../button/MyButton'
const Navbar = () => {
  const { setIsAuth } = useContext(AuthContext)

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }
  return (
    <div className='navbar'>
      <div className='navbar__links'>
        <Link to="about">О сайте</Link>
        <Link to="posts">Посты</Link>
        <Link to="posts_scroll">Посты прокрутка</Link>
      </div>
      <MyButton onClick={logout} style={{ marginLeft: '10px', color: 'white' }}>Выйти</MyButton>
    </div>
  )
}
export default Navbar