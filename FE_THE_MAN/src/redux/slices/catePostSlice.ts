import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCatePost,
  getAlls,
  read,
  remove,
  update,
} from "../../api-cilent/CatePost";
import { ICatePost } from "../../models/CatePost";
interface ICatePostState {
  cateposts: ICatePost[];
  catepost: ICatePost | {};
}
const initialState: ICatePostState = {
  cateposts: [],
  catepost: {},
};
export const getAllCatePosts = createAsyncThunk("catepost/getall", async () => {
  const res = await getAlls();
  return res;
});
export const addCatePost = createAsyncThunk(
  "catepost/create",
  async (catepost: ICatePost) => {
    const res = await createCatePost(catepost);
    return res;
  }
);

export const deleteCatePost = createAsyncThunk(
  "catepost/remove",
  async (_id: string) => {
    const res = await remove(_id);
  }
);
export const getCatePost = createAsyncThunk(
  "catepost/getCatePost",
  async (id: any) => {
    const res = await read(id);
    return res;
  }
);
export const updateCatePost = createAsyncThunk(
  "catepost/updateCatePost",
  async (catepost: ICatePost) => {
    const res = await update(catepost);
    return res;
  }
);
const catePostSlice = createSlice({
  name: "catepost",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(addCatePost.fulfilled, (state, { payload }) => {
      state.cateposts.push(payload as ICatePost);
    });
    build.addCase(getAllCatePosts.fulfilled, (state, { payload }) => {
      state.cateposts = payload || [];
    });
    build.addCase(deleteCatePost.fulfilled, (state, { payload }) => {
      state.cateposts = state.cateposts.filter((item) => item._id !== payload);
    });
    build.addCase(getCatePost.fulfilled, (state, { payload }) => {
      state.catepost = payload as ICatePost;
    });
    build.addCase(updateCatePost.fulfilled, (state, { payload }) => {
      state.cateposts = state.cateposts = state.cateposts.map((item) =>
        item._id === payload?._id ? payload : item
      ) as ICatePost[];
    });
  },
});
export default catePostSlice.reducer;
