import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAlls } from "../../api-cilent/CatePost";
import {
  add,
  filter,
  get,
  getAll,
  remove,
  update,
} from "../../api-cilent/Post";

import { Posts } from "../../models/post";
import { useAppDispatch } from "../store";

type PostsState = {
  posta: [];
  posts: {
    count: number;
    Post: Posts[];
  };
  catePost: [];
  post: Posts | {};
  page: number;
  limit: number;
};

const initialState: PostsState = {
  posta: [],
  catePost: [],
  posts: {
    count: 0,
    Post: [],
  },
  page: 1,
  limit: 10,
  post: {},
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (data: any) => {
    const response = await getAll(data.page, data.limit);
    return response;
  }
);
export const getAllCatePosts = createAsyncThunk("catepost/getall", async () => {
  const res = await getAlls();
  return res;
});
export const deletePosts = createAsyncThunk(
  "posts/deletePosts",
  async (_id: string) => {
    const datas = await remove(_id);
    return _id;
  }
);

export const addPosts = createAsyncThunk(
  "posts/addPost",
  async (posts: any) => {
    const res = await add(posts);
    return res;
  }
);

export const getPost = createAsyncThunk("posts/getPost", async (id: any) => {
  const res = await get(id);
  return res?.data;
});
export const filter_post = createAsyncThunk(
  "posts/filter_post",
  async (post: any) => {
    const res = await filter(post);
    return res;
  }
);

export const updatePosts = createAsyncThunk(
  "posts/updatePost",
  async (posts: any) => {
    const res = await update(posts);
    return res;
  }
);
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, { payload }) => {
      state.posts = payload as any;
    });
    builder.addCase(getAllCatePosts.fulfilled, (state, { payload }) => {
      state.catePost = payload as any;
    });
    builder.addCase(deletePosts.fulfilled, (state, { payload }) => {
      state.posts.Post = state.posts.Post.filter(
        (item) => item._id !== payload
      );
    });

    builder.addCase(filter_post.fulfilled, (state, { payload }) => {
      console.log(payload);

      state.posts = payload.data as any;
    });

    builder.addCase(getPost.fulfilled, (state, { payload }) => {
      state.post = payload as Posts;
    });

    builder.addCase(updatePosts.fulfilled, (state, { payload }) => {
      state.posts.Post = state.posts.Post.map((item) =>
        item._id === payload?._id ? payload : item
      ) as Posts[];
    });
  },
});

export default postsSlice.reducer;
export const { setPage } = postsSlice.actions;
