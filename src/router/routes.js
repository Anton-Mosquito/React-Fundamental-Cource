import { Navigate } from "react-router-dom";
import About from "../pages/About";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

export const privateRoutes =  [
  { path: '/about',  element: <About/> },
  { path: '/posts',  element: <Posts/> },
  { path: '/posts/:id',  element: <PostIdPage/> },
  { path: '*', element: <Navigate to="/posts" replace />}
];

export const publicRoutes =  [
  { path: '/login',  element: <Login/> },
  { path: '*', element: <Navigate to="/login" replace />},
];

