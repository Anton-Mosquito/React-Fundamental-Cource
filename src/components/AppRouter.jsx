import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context';
import { privateRoutes,
  publicRoutes } from '../router/routes';
import Loader from './UI/loader/loader';

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader/>
  }
  
  return (
    <Routes>
        { isAuth
          ? privateRoutes.map(route => 
              <Route path={route.path} element={route.element} key={route.path}/>
            )
          : publicRoutes.map(route => 
              <Route path={route.path} element={route.element} key={route.path}/>
            )
        }
        {/* <Route path='/about' element={<About/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/posts/:id' element={<PostIdPage/>}/>
        <Route
          path="*"
          element={<Navigate to="/posts" replace />}
        /> */}
        {/* <Route
          path="*"
          element={<Error/>}
        /> */}
      </Routes>
  )
}

export default AppRouter