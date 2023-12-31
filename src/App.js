import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Users from './Components/Users/Users';
import { getAllUsers } from './Components/Users/api';
import { getAllPosts } from './Components/Posts/Postapi';
import ShowUser from './Components/Users/ShowUser';
import NewUserForm from './Components/Users/NewUserForm';
import Posts from './Components/Posts/Posts'
// import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import UserLogin from './Components/Users/UserLogin';
import ShowUserPosts from './Components/Users/ShowUserPosts';
import ShowUserPost from './Components/Users/ShowUserPost';
import UserAccount from './Components/Users/UserAccount';
import UserDeleteAccount from './Components/Users/UserDeleteAccount';
import UserUpdateAccount from './Components/Users/UserUpdateAccount';
import DeleteSuccessful from './Components/Users/DeleteSuccessful';
import UserUpdatePassword from './Components/Users/UserUpdatePassword';
import UserPasswordUpdated from './Components/Users/UserPasswordUpdated';
import LogOut from './Components/Users/LogOut';
import UserUpdatePostForm from './Components/Users/UserUpdatePostForm';
import ContactIcons from './Components/ContactIcons/ContactIcons'
import CreatePostForm from './Components/Users/CreatePostForm';

import './App.scss';

function App() {
const [users, setUsers] = useState([])
const [tokenInLocalStorage, setTokenInLocalStorage] = useState(false)
// const [darkMode, setDarkMode] = useState(false)

const [posts, setPosts] = useState([])
const [author, setAuthor]=useState("")
const [title, setTitle]=useState("")
const [id, setId]=useState("")
const [content, setContent]=useState("")
//separate update parameters to prevent usage of the id across forms
const [idUpdate, setIdUpdate]=useState("")


  useEffect(() => {
      getAllUsers()
      .then(results => results.json())
      .then(data => {
          setUsers(data)})

      getAllPosts()
        .then((data) => data.json())
        .then((newPosts) => {
          console.log('fetching posts...')
          console.log(newPosts)
          setPosts(newPosts)});
      
      
  

    let token = JSON.parse(localStorage.getItem('divorceJWT')) 
    if (token) {
      setTokenInLocalStorage(true)
    } else {
      setTokenInLocalStorage(false)
    }

  }, [])

  // function handleDarkMode() {
  //   setDarkMode(!darkMode)
  // }
  
  return (
    <div className='app'>
      <Header tokenInLocalStorage={tokenInLocalStorage} setTokenInLocalStorage={setTokenInLocalStorage}/>
      <ContactIcons />
      <div className='app-container'>
      <Routes>

        {/*** HOME ***/}
        <Route path='/' element={<Homepage />}></Route>

         {/*** USER ROUTES ***/}
            {/* USER: SHOW ROUTES */}
            <Route path='/users' element={<Users users={users} setUsers={setUsers} tokenInLocalStorage={tokenInLocalStorage}/>}></Route>
            <Route path='/users/:id' element={<ShowUser setUsers={setUsers}/>}></Route>
            <Route path='/users/:id/posts' element={<ShowUserPosts/>}></Route>
            <Route path='/users/:id/posts/:postId' element={<ShowUserPost/>}></Route>

            {/* USER: SIGN UP/LOGIN/LOGOUT */}
            <Route path='/users/create' element={<NewUserForm setUsers={setUsers} setTokenInLocalStorage={setTokenInLocalStorage}/>}></Route>
            <Route path='/users/login' element={<UserLogin setUsers={setUsers} setTokenInLocalStorage={setTokenInLocalStorage}/>}></Route>
            <Route path='/users/:id/account' element={<UserAccount setUsers={setUsers}/>}></Route>
            <Route path='/users/logout' element={<LogOut/>}></Route>

            {/* USER: DELETE ACCOUNT */}
            <Route path='/users/:id/account/delete' element={<UserDeleteAccount setUsers={setUsers} setTokenInLocalStorage={setTokenInLocalStorage}/>}></Route>
            <Route path='/users/deletesuccessful' element={<DeleteSuccessful setUsers={setUsers} />}></Route>

            {/* USER: UPDATE ACCOUNT */}
            <Route path='/users/:id/account/update' element={<UserUpdateAccount setUsers={setUsers}/>}></Route>
            <Route path='/users/:id/account/update/password' element={<UserUpdatePassword setUsers={setUsers}/>}></Route>
            <Route path='/users/:id/account/update/password/success' element={<UserPasswordUpdated setUsers={setUsers}/>}></Route>
            <Route path='/users/:id/posts/create' element={<CreatePostForm />}></Route>
            <Route path='/users/:id/posts/:postId/update' element={<UserUpdatePostForm />}></Route>

          

        {/*** POST ROUTES ***/}
        <Route path='/posts' element={<Posts
          posts={posts}
          setPosts={setPosts}
          author={author}
          setAuthor={setAuthor}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          id={id}
          setId={setId}
          idUpdate={idUpdate}
          setIdUpdate={setIdUpdate}
        />}></Route>
        <Route path='/post/:id' element={<h1>Coming soon...</h1>}></Route>

        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
      </div>
    
  </div>
  );
}

export default App
