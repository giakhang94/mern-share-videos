import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import {
  ADD_LIST_TAG,
  ADMIN_DELETE_USER_BEGIN,
  ADMIN_DELETE_USER_ERROR,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_GET_ALL_USER_BEGIN,
  ADMIN_GET_ALL_USER_ERROR,
  ADMIN_GET_ALL_USER_SUCCESS,
  CLEAR_ALERT,
  DISPLAY_ALERT,
  DISPLAY_TAG_ALERT,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_ERROR,
  GET_CURRENT_USER_SUCCESS,
  HANDLE_CHANGE,
  HIDE_SIDEBAR,
  HIDE_TAGS_MODAL,
  PAGINATIO_SET_PAGE,
  SAVE_TAG,
  SEARCH_SET_VALUE,
  SHOW_SIDEBAR,
  SHOW_TAGS_MODAL,
  THUMBNAIL_GET_ALL_BEGIN,
  THUMBNAIL_GET_ALL_SUCCESS,
  THUMBNAIL_UPLOAD_BEGIN,
  THUMBNAIL_UPLOAD_ERROR,
  THUMBNAIL_UPLOAD_SUCCESS,
  USER_CREATE_BEGIN,
  USER_CREATE_ERROR,
  USER_CREATE_SUCCESS,
  USER_LOGIN_BEGIN,
  USER_LOGIN_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE_BEGIN,
  USER_UPDATE_ERROR,
  USER_UPDATE_SUCCESS,
  VIDEO_CREATE_BEGIN,
  VIDEO_CREATE_ERROR,
  VIDEO_CREATE_SUCCESS,
  VIDEO_DELETE_BEGIN,
  VIDEO_DELETE_ERROR,
  VIDEO_DELETE_SUCCESS,
  VIDEO_GET_ALL_BEGIN,
  VIDEO_GET_ALL_ERROR,
  VIDEO_GET_ALL_SUCCESS,
  VIDEO_GET_BY_AUTH_BEGIN,
  VIDEO_GET_BY_AUTH_ERROR,
  VIDEO_GET_BY_AUTH_SUCCESS,
  VIDEO_HOME_GET_ALL_BEGIN,
  VIDEO_HOME_GET_ALL_ERROR,
  VIDEO_HOME_GET_ALL_SUCCESS,
  VIDEO_UPDATE_BEGIN,
  VIDEO_UPDATE_ERROR,
  VIDEO_UPDATE_SUCCESS,
} from "./action";
import axios from "axios";
import { Navigate } from "react-router-dom";

const initState = {
  reloadPage: false,
  isLoading: false,
  showAlert: false,
  showAlertTag: false,
  //pagi
  numOfPages: 1,
  page: 1,
  //search
  tagSearch: "",
  categorySearch: "all",
  isDoneCreateVideo: false,
  alertType: "",
  alertText: "",
  isLogin: false,
  userName: "",
  password: "",
  //use cookies
  user: null,
  isAdmin: false,
  // token: "",
  //admin get all data
  listUser: [],
  //thumbnail
  allThumb: [],
  //allvideos
  allVideos: [],
  tagList: [],
  isEditTag: false,
  category: ["Kalama", "A Tỳ Đàm", "Truyện Phím", "Hỏi Đáp", "Kinh Tạng"],
  //sidebar
  sidebar: false,
};
const appContext = createContext();

const AppContextProvier = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  //axios global setup fo authoriztion
  // axios.defaults.withCredentials = true;
  const authFetch = axios.create({
    baseURL: "/api/v1",
    // Accept: "application/json",
    "content-type": "application/json",
    // credentials: "include",
    // withCredentials: true,
  });
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("interceptor", error);
      if (error.response.data.status === 401) {
        console.log("Auth erorr");
      }
      return Promise.reject(error);
    }
  );
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  const displayAlert = (type, text) => {
    dispatch({ type: DISPLAY_ALERT, payload: { type, text } });
    clearAlert();
  };
  //modal edit tags
  const showModal = (tags) => {
    dispatch({ type: SHOW_TAGS_MODAL, payload: { tags } });
  };
  const hideModal = () => {
    dispatch({ type: HIDE_TAGS_MODAL });
  };
  const handleChange = (data) => {
    dispatch({ type: HANDLE_CHANGE, payload: data });
  };
  const login = async (loginData) => {
    dispatch({ type: USER_LOGIN_BEGIN });
    try {
      const { data } = await authFetch.post("/user/login", {
        ...loginData,
      });
      const user = data.user;
      dispatch({ type: USER_LOGIN_SUCCESS, payload: { user } });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: USER_LOGIN_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch.get("/user/getCurrentUser");
      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: GET_CURRENT_USER_ERROR });
      return <Navigate to="/login" />;
    }
  };
  const updateUser = async (dataUpdate, id) => {
    dispatch({ type: USER_UPDATE_BEGIN });
    try {
      const { data } = await authFetch.patch(`/user/${id}`, { ...dataUpdate });
      dispatch({ type: USER_UPDATE_SUCCESS, payload: { user: data.user } });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_ERROR,
        payload: { msg: error.response.data.msg },
      });
      // console.log(error);
    }
    clearAlert();
  };
  const createUser = async (dataCreate) => {
    dispatch({ type: USER_CREATE_BEGIN });
    try {
      await authFetch.post("/user", { ...dataCreate });
      dispatch({ type: USER_CREATE_SUCCESS });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: USER_CREATE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    setTimeout(() => {
      clearAlert();
    }, 3000);
  };
  const logout = async () => {
    await authFetch.get("/user/logout");
    dispatch({ type: USER_LOGOUT });
  };
  const getAllUser = async () => {
    dispatch({ type: ADMIN_GET_ALL_USER_BEGIN });
    try {
      const { data } = await authFetch.get("/user/admin/getall");
      dispatch({
        type: ADMIN_GET_ALL_USER_SUCCESS,
        payload: { list: data.listUser },
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: ADMIN_GET_ALL_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      logout();
    }
  };
  const deleteUser = async (id) => {
    dispatch({ type: ADMIN_DELETE_USER_BEGIN });
    try {
      await authFetch.delete(`user/admin/deleteUser/${id}`);
      dispatch({ type: ADMIN_DELETE_USER_SUCCESS });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: ADMIN_DELETE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const uploadThumbnail = async (data) => {
    const dataFile = new FormData();
    dataFile.append("thumb", data.thumb);
    dataFile.append("description", data.description);
    dispatch({ type: THUMBNAIL_UPLOAD_BEGIN });
    try {
      await authFetch.post("/image", dataFile);
      dispatch({ type: THUMBNAIL_UPLOAD_SUCCESS });
    } catch (error) {
      dispatch({
        type: THUMBNAIL_UPLOAD_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  const getAllThumb = async () => {
    dispatch({ type: THUMBNAIL_GET_ALL_BEGIN });
    try {
      const { data } = await authFetch.get("/image/all-thumb");

      dispatch({ type: THUMBNAIL_GET_ALL_SUCCESS, payload: { data } });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: THUMBNAIL_UPLOAD_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //video
  const createVideo = async (data) => {
    dispatch({ type: VIDEO_CREATE_BEGIN });
    try {
      await authFetch.post("/video", { ...data });
      dispatch({ type: VIDEO_CREATE_SUCCESS });
    } catch (error) {
      dispatch({
        type: VIDEO_CREATE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const getPostsByAuth = async () => {
    dispatch({ type: VIDEO_GET_BY_AUTH_BEGIN });
    try {
      const { data } = await authFetch.get("/video/getPostsByAuth");
      dispatch({
        type: VIDEO_GET_BY_AUTH_SUCCESS,
        payload: { data: data.video },
      });
    } catch (error) {
      dispatch({
        type: VIDEO_GET_BY_AUTH_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const updateVideo = async (data, id) => {
    dispatch({ type: VIDEO_UPDATE_BEGIN });
    try {
      await authFetch.patch(`/video/${id}`, { ...data });
      dispatch({ type: VIDEO_UPDATE_SUCCESS });
    } catch (error) {
      dispatch({
        type: VIDEO_UPDATE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const saveTag = (tag) => {
    dispatch({ type: SAVE_TAG, payload: { tag } });
  };
  const deleteVideo = async (id, page) => {
    dispatch({ type: VIDEO_DELETE_BEGIN });
    try {
      await authFetch.delete(`video/${id}`);
      dispatch({ type: VIDEO_DELETE_SUCCESS });
      // getAllVideo({ tag: "", category: "all", page });
    } catch (error) {
      dispatch({
        type: VIDEO_DELETE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //get all videos for filter
  const getAllVideo = async (tag, category, page) => {
    dispatch({ type: VIDEO_HOME_GET_ALL_BEGIN });
    let url = `/video/all?category=${category}&page=${page ? page : ""}`;
    if (tag) {
      url = url + `&tag=${tag}`;
    }
    // console.log(url);
    try {
      const { data } = await authFetch.get(url);
      dispatch({ type: VIDEO_HOME_GET_ALL_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: VIDEO_HOME_GET_ALL_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //get all videos for filter in home page
  const getAllVideoHome = async (tag, category, page) => {
    dispatch({ type: VIDEO_GET_ALL_BEGIN });
    let url = `/video/all-home?category=${category}&page=${page ? page : ""}`;
    if (tag) {
      url = url + `&tag=${tag}`;
    }
    // console.log(url);
    try {
      const { data } = await authFetch.get(url);
      dispatch({ type: VIDEO_GET_ALL_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: VIDEO_GET_ALL_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const setPage = (page) => {
    dispatch({ type: PAGINATIO_SET_PAGE, payload: { page } });
  };
  const setSearchValue = ({ tag, category }) => {
    dispatch({ type: SEARCH_SET_VALUE, payload: { tag, category } });
  };
  const showSidebar = () => {
    dispatch({ type: SHOW_SIDEBAR });
  };
  const hideSidebar = () => {
    dispatch({ type: HIDE_SIDEBAR });
  };
  //add tag to global variable
  const setListTag = (tag) => {
    dispatch({ type: ADD_LIST_TAG, payload: { tag } });
  };
  const displayTagAlert = (type, message) => {
    dispatch({ type: DISPLAY_TAG_ALERT, payload: { type, message } });
    setTimeout(() => {
      clearAlert();
    }, 3000);
  };
  //useEffect to get login user infomation from cookie
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <appContext.Provider
      value={{
        ...state,
        handleChange,
        getCurrentUser,
        login,
        updateUser,
        createUser,
        logout,
        getAllUser,
        deleteUser,
        displayAlert,
        uploadThumbnail,
        getAllThumb,
        createVideo,
        getPostsByAuth,
        updateVideo,
        showModal,
        hideModal,
        saveTag,
        deleteVideo,
        getAllVideo,
        setPage, //paginaton
        setSearchValue, //search
        getAllVideoHome, //home page
        showSidebar,
        hideSidebar,
        setListTag,
        displayTagAlert,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(appContext);
};
export { AppContextProvier, useAppContext };
