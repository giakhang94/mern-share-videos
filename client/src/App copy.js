import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { About, Home, Login, Profile, ProtectedAdminPage } from "./pages";
import { Header, Loading } from "./components";
import { useAppContext } from "./context/appContext";
import ShareLayout from "./pages/dashboard/shareLayout";
import {
  AddPost,
  AddThumbnail,
  AddUser,
  AllPosts,
  AllUser,
  ProfileUser,
} from "./pages/dashboard";
import ProtectedUserPage from "./pages/ProtectedUserPage";
import ShareLayoutUser from "./pages/dashboard/ShareLayoutUser";
function App() {
  const state = useAppContext();
  // if (state.isLoading) {
  //   return <Loading />;
  // }
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={
            state.isLogin && state.user.role === "Admin" ? (
              <ProtectedAdminPage>
                <ShareLayout />
              </ProtectedAdminPage>
            ) : state.isLogin && state.user.role === "Auth" ? (
              <ProtectedUserPage>
                <ShareLayoutUser />
              </ProtectedUserPage>
            ) : (
              <Login />
            )
          }
        >
          <Route
            index
            element={
              state.user && state.user.role === "Admin" ? (
                <Profile />
              ) : (
                <ProfileUser />
              )
            }
          />
          {state.user && state.user.role === "Admin" ? (
            <>
              <Route path="/profile/admin/all-users" element={<AllUser />} />
              <Route path="/profile/admin/all-posts" element={<AllPosts />} />
              <Route path="/profile/admin/add-post" element={<AddPost />} />
              <Route path="/profile/admin/add-user" element={<AddUser />} />
              <Route
                path="/profile/admin/add-thumbnail"
                element={<AddThumbnail />}
              />
            </>
          ) : (
            <>
              <Route path="/profile/user/add-post" element={<AddPost />} />
              <Route path="/profile/user/all-posts" element={<AllPosts />} />

              <Route
                path="/profile/user/add-thumbnail"
                element={<AddThumbnail />}
              />
            </>
          )}
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="*" element="page not found" />
      </Routes>
    </Router>
  );
}

export default App;
