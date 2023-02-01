import {
  ADMIN_DELETE_USER_BEGIN,
  ADMIN_DELETE_USER_ERROR,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_GET_ALL_USER_BEGIN,
  ADMIN_GET_ALL_USER_ERROR,
  ADMIN_GET_ALL_USER_SUCCESS,
  CLEAR_ALERT,
  DISPLAY_ALERT,
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
  THUMBNAIL_GET_ALL_ERROR,
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

function reducer(state, action) {
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === GET_CURRENT_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_CURRENT_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    // console.log(action.payload);
    return {
      ...state,
      user: action.payload,
      isLoading: false,
      isLogin: true,
      isAdmin: action.payload.role === "Admin",
    };
  }
  if (action.type === USER_LOGIN_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === USER_LOGIN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      isLogin: true,
      isAdmin: action.payload.user.role === "Admin",
      showAlert: true,
      alertText: "Đăng nhập thành công...",
      alertType: "succes",
    };
  }
  if (action.type === USER_LOGIN_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === USER_UPDATE_BEGIN) {
    return {
      ...state,
      reloadPage: false,
      isLoading: true,
    };
  }
  if (action.type === USER_UPDATE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      // user: action.payload.user,
      reloadPage: true,
    };
  }
  if (action.type === USER_UPDATE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === USER_CREATE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === USER_CREATE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "Tạo user thành công",
      alertType: "success",
    };
  }
  if (action.type === USER_CREATE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
    };
  }
  if (action.type === USER_LOGOUT) {
    return {
      ...state,
      isLogin: false,
      isAdmin: false,
      user: null,
    };
  }
  if (action.type === ADMIN_GET_ALL_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ADMIN_GET_ALL_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      listUser: action.payload.list,
    };
  }
  if (action.type === ADMIN_GET_ALL_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === ADMIN_DELETE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === ADMIN_DELETE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      reloadPage: !state.reloadPage,
    };
  }
  if (action.type === ADMIN_DELETE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.msg,
      alertType: "danger",
      showAlert: true,
    };
  }
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: action.payload.type,
      alertText: action.payload.text,
    };
  }
  if (action.type === THUMBNAIL_UPLOAD_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === THUMBNAIL_UPLOAD_SUCCESS) {
    return {
      ...state,
      isloading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Đã tải thumb lên kho ảnh xong",
    };
  }
  if (action.type === THUMBNAIL_UPLOAD_ERROR) {
    return {
      ...state,
      isloading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === THUMBNAIL_GET_ALL_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === THUMBNAIL_GET_ALL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      allThumb: action.payload.data.allthumbs,
      reloadPage: !state.reloadPage,
    };
  }
  if (action.type === THUMBNAIL_GET_ALL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "Can not load links of thumbnails",
      alertType: "danger",
    };
  }
  if (action.type === VIDEO_CREATE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === VIDEO_CREATE_SUCCESS) {
    return {
      ...state,
      isDoneCreateVideo: true,
      isLoading: false,
      showAlert: true,
      alertText: "Đã tạo thành công video",
      alertType: "success",
    };
  }
  if (action.type === VIDEO_CREATE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === VIDEO_GET_BY_AUTH_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === VIDEO_GET_BY_AUTH_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      // reloadPage: !state.reloadPage,
      allVideos: action.payload.data,
    };
  }
  if (action.type === VIDEO_GET_BY_AUTH_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === VIDEO_UPDATE_BEGIN) {
    return {
      ...state,
      reloadPage: false,
      isLoading: true,
      isDoneCreateVideo: false,
    };
  }
  if (action.type === VIDEO_UPDATE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      reloadPage: true,
      isDoneCreateVideo: true,
    };
  }
  if (action.type === VIDEO_UPDATE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  //tags modal
  if (action.type === SHOW_TAGS_MODAL) {
    return {
      ...state,
      isEditTag: true,
      tagList: action.payload.tags,
    };
  }
  if (action.type === HIDE_TAGS_MODAL) {
    return {
      ...state,
      isEditTag: false,
      // tagList: [],
    };
  }
  if (action.type === SAVE_TAG) {
    return {
      ...state,
      tagList: action.payload.tag,
    };
  }
  if (action.type === VIDEO_DELETE_BEGIN) {
    return {
      ...state,
      isDoneCreateVideo: false,
      isLoading: true,
    };
  }
  if (action.type === VIDEO_DELETE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isDoneCreateVideo: true,
    };
  }
  if (action.type === VIDEO_DELETE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === VIDEO_GET_ALL_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === VIDEO_GET_ALL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      allVideos: action.payload.data.videos,
      total: action.payload.data.total,
      numOfPages: action.payload.data.numOfPages,
      reloadPage: !state.reloadPage,
    };
  }
  if (action.type === VIDEO_GET_ALL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === PAGINATIO_SET_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }
  if (action.type === SEARCH_SET_VALUE) {
    return {
      ...state,
      tagSearch: action.payload.tag,
      categorySearch: action.payload.category,
    };
  }
  //home page
  if (action.type === VIDEO_HOME_GET_ALL_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === VIDEO_HOME_GET_ALL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      allVideos: action.payload.data.videos,
      total: action.payload.data.total,
      numOfPages: action.payload.data.numOfPages,
      reloadPage: !state.reloadPage,
    };
  }
  if (action.type === VIDEO_HOME_GET_ALL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  //sidebar
  if (action.type === SHOW_SIDEBAR) {
    return {
      ...state,
      sidebar: !state.sidebar,
    };
  }
  if (action.type === HIDE_SIDEBAR) {
    return {
      ...state,
      sidebar: false,
    };
  }
}
export default reducer;
