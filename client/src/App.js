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
import SBlog from "./pages/blog/blog";
axios.defaults.withCredentials = true;
// { path: "/post",  element:<RequireAuth/>,   children: <Post /> },

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
            <SBlog />
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
  // {
  //   path: "/post",
  //   element: <SignUp />,
  // },
]);
function App() {
  return (
    <div className="App">
      <div className="all_cn">
        <RouterProvider router={router} />
        {/* <Footer/> */}
      </div>
      {/* <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

      </Routes>
    </Router> */}
    </div>
  );
}

export default App;
