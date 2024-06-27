import { createSlice } from "@reduxjs/toolkit";
import  databaseService  from "../appwrite/config";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPostsSuccess: (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    },
    fetchPostsPending: (state) => {
      state.status = "loading";
    },
    fetchPostsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    addPostSuccess: (state, action) => {
      state.status = "succeeded";
      state.posts.push(action.payload);
    },
    addPostPending: (state) => {
      state.status = "loading";
    },
    addPostFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    editPostSuccess: (state, action) => {
      state.status = "succeeded";
      state.posts = state.posts.map((post) =>
        post.$id === action.payload.$id ? action.payload : post
      );
    },
    editPostPending: (state) => {
      state.status = "loading";
    },
    editPostFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    deletePostSuccess: (state, action) => {
      state.status = "succeeded";
      state.posts = state.posts.filter((post) => post.$id !== action.payload.$id);
    },
    deletePostPending: (state) => {
      state.status = "loading";
    },
    deletePostFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logOut: (state) => {
      state.posts = [];
      state.status = "idle";
    },
  },
});

export const fetchPosts = (userId = null) => async (dispatch) => {
  try {
    dispatch(postSlice.actions.fetchPostsPending());
    const response = userId
      ? await databaseService.getUserPosts()
      : await databaseService.getAllPosts();

    if (response) {
      dispatch(postSlice.actions.fetchPostsSuccess(response.documents));
    } else {
      dispatch(postSlice.actions.fetchPostsFailure("Error fetching posts"));
    }
  } catch (error) {
    dispatch(postSlice.actions.fetchPostsFailure(error.message));
  }
};

export const addPost = (postData) => async (dispatch) => {
  try {
    dispatch(postSlice.actions.addPostPending());
    const response = await databaseService.createPost(postData);

    if (response) {
      dispatch(postSlice.actions.addPostSuccess(response));
    } else {
      dispatch(postSlice.actions.addPostFailure("Error adding post"));
    }
  } catch (error) {
    dispatch(postSlice.actions.addPostFailure(error.message));
  }
};

export const editPost = (postData) => async (dispatch) => {
  try {
    dispatch(postSlice.actions.editPostPending());
    const response = await databaseService.updatePost(postData.$id, postData);

    if (response) {
      dispatch(postSlice.actions.editPostSuccess(response));
    } else {
      dispatch(postSlice.actions.editPostFailure("Error editing post"));
    }
  } catch (error) {
    dispatch(postSlice.actions.editPostFailure(error.message));
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch(postSlice.actions.deletePostPending());
    const response = await databaseService.deletePost(postId);

    if (response) {
      dispatch(postSlice.actions.deletePostSuccess(response));
    } else {
      dispatch(postSlice.actions.deletePostFailure("Error deleting post"));
    }
  } catch (error) {
    dispatch(postSlice.actions.deletePostFailure(error.message));
  }
};

export const { logOut } = postSlice.actions;
export default postSlice.reducer;
