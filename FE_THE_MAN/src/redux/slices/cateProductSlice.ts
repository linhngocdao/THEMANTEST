import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCateProduct,
  getAllCateProduct,
  getAllCateProductadmin,
  readCateProduct,
  removeCateProduct,
  updateCateProduct,
} from "../../api-cilent/CatePro";
import { ICatePro } from "../../models/CatePro";

interface ICateProState {
  cateproducts: ICatePro[];
  cateproduct: ICatePro | {};
}

const initialState: ICateProState = {
  cateproducts: [],
  cateproduct: {},
};

export const getCatePro = createAsyncThunk("catepro/getAll", async () => {
  const res = await getAllCateProduct();

  return res;
});
export const getCateadmin = createAsyncThunk(
  "catepro/getALLadmin",
  async () => {
    const res = await getAllCateProductadmin();

    return res;
  }
);
export const readCatePro = createAsyncThunk("catepro/read", async (id: any) => {
  const res = await readCateProduct(id);
  return res;
});
export const addCatePro = createAsyncThunk(
  "catepro/create",
  async (cateproduct: ICatePro) => {
    const res = await createCateProduct(cateproduct);
    return res;
  }
);
export const updateCatePro = createAsyncThunk(
  "catepro/edit",
  async (datacate: any) => {
    const res = await updateCateProduct(datacate);
    return res;
  }
);
export const deleteCatePro = createAsyncThunk(
  "category/delete",
  async (id: any) => {
    const res = await removeCateProduct(id);
    return res;
  }
);

const cateProSlice = createSlice({
  name: "catepro",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getCatePro.fulfilled, (state, { payload }) => {
      state.cateproducts = payload as any;
    });
    build.addCase(getCateadmin.fulfilled, (state, { payload }) => {
      state.cateproducts = payload as any;
    });
    build.addCase(readCatePro.fulfilled, (state, { payload }) => {
      state.cateproduct = payload as ICatePro;
    });

    build.addCase(addCatePro.fulfilled, (state, { payload }) => {
      state.cateproducts.push(payload as ICatePro);
    });

    build.addCase(updateCatePro.fulfilled, (state, { payload }) => {
      state.cateproduct = state.cateproducts.map(
        (item) => item._id === payload._id
      );
    });

    build.addCase(deleteCatePro.fulfilled, (state, { payload }) => {
      state.cateproducts = state.cateproducts.filter(
        (item) => item._id !== payload._id
      );
    });
  },
});
export default cateProSlice.reducer;
