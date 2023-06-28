import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/home";
import SignIn from "./pages/signIn/signin";
import SignUp from "./pages/signUp/signup";
import Layout from "./components/layout/layout";
import Post from "./pages/post/post";
import Blogs from "./pages/blogs/blogs";
import Profile from "./pages/profile/profile";
import axios from "axios";
import RequireAuth from "./components/requireAuth/requireAuth";
import Blog from "./pages/blog/blog";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    element: <Layout />,

    children: [
      { path: "/", element: <Home /> },
      { path: "/blogs", element: <Blogs /> },

      {
        path: "/post",
        element: (
          <RequireAuth>
            <Post />
          </RequireAuth>
        ),
      },
      {
        path: "/profile",
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },

      {
        path: "/blogs/:id",
        element: (
          <RequireAuth>
            <Blog />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
function App() {
  return (
    <div className="App">
      <div className="all_cn">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
