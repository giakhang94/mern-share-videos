import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import {
  About,
  Home,
  Login,
  Profile,
  ProtectedAdminPage,
  Video,
} from "./pages";
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

const profileElement = {
  Admin: (
    <ProtectedAdminPage>
      <ShareLayout />
    </ProtectedAdminPage>
  ),
  Auth: (
    <ProtectedUserPage>
      <ShareLayoutUser />
    </ProtectedUserPage>
  ),
};

const profileTopElement = {
  Admin: <Profile />,
  Auth: <ProfileUser />,
};

const profileRoutesByRole = {
  Admin: (
    <>
      <Route path="/profile/admin/all-users" element={<AllUser />} />
      <Route path="/profile/admin/all-posts" element={<AllPosts />} />
      <Route path="/profile/admin/add-post" element={<AddPost />} />
      <Route path="/profile/admin/add-user" element={<AddUser />} />
      <Route path="/profile/admin/add-thumbnail" element={<AddThumbnail />} />
    </>
  ),
  Auth: (
    <>
      <Route path="/profile/user/add-post" element={<AddPost />} />
      <Route path="/profile/user/all-posts" element={<AllPosts />} />

      <Route path="/profile/user/add-thumbnail" element={<AddThumbnail />} />
    </>
  ),
};

function App() {
  const { isLogin, user } = useAppContext();
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
          element={isLogin && user ? profileElement[user.role] : <Login />}
        >
          {user && <Route index element={profileTopElement[user.role]} />}
          {user && profileRoutesByRole[user.role]}
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="*" element="page not found" />
      </Routes>
    </Router>
  );
}

export default App;
