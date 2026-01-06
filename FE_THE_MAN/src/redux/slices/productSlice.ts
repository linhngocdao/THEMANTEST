import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  add,
  filter,
  get,
  getAll,
  searchs,
  remove,
  thongke,
  update,
  getAllproduct,
} from "../../api-cilent/Product";

import { Product } from "../../models/Product";
import { useAppDispatch } from "../store";

type ProductsState = {
  products: {
    [x: string]: any;
    count: number;
    Product: Product[];
  };
  loading: boolean;
  product: Product;
  page: number;
  limit: number;
};

const initialState: ProductsState = {
  products: {
    count: 0,
    Product: [],
  },
  page: 1,
  limit: 10,
  product: {
    desc: "",
    status: "ACTIVE"
  },
  loading: false,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (data: any) => {
    const response = await getAll(data.page, data.limit);
    return response?.data?.products;
  }
);
export const getProductadmins = createAsyncThunk(
  "products/getProductadmins",
  async (data: any) => {
    const response = await getAllproduct(data.page, data.limit);
    return response;
  }
);
export const thongkes = createAsyncThunk(
  "products/thongke",
  async (data: any) => {
    const response = await thongke(data);
    return response;
  }
);
export const search = createAsyncThunk("products/filter", async (data: any) => {
  const response = await searchs(data);
  return response;
});

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (_id: any) => {
    const data = await remove(_id);
    return _id;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: any) => {
    const res = await add(product);
    return res;
  }
);

export const filter_product = createAsyncThunk(
  "products/filter_product",
  async (product: any) => {
    const res = await filter(product);
    return res;
  }
);
export const filter_product_admin = createAsyncThunk(
  "products/filter_product_admin",
  async (product: any) => {
    const res = await filter(product);
    return res;
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id: any) => {
    const res = await get(id);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: any) => {
    const res = await update(product);
    return res;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.products.Product = payload as any;
    });
    builder.addCase(getProductadmins.fulfilled, (state, { payload }) => {
      console.log("payload", payload);

      state.products = payload as any;
    });
    builder.addCase(thongkes.pending, (state, { payload }) => {
      console.log(payload);

      state.loading = true;
    });
    builder.addCase(thongkes.fulfilled, (state, { payload }) => {
      state.product = payload as any;
      state.loading = false;
    });
    builder.addCase(search.fulfilled, (state, { payload }) => {
      console.log(payload);

      state.products.Product = payload as any;
    });
    builder.addCase(filter_product.fulfilled, (state, { payload }) => {
      console.log(payload.data);

      state.products.Product = payload.data.products as any;
      state.products.count = payload.data.count as any;
    });
    builder.addCase(filter_product_admin.fulfilled, (state, { payload }) => {
      console.log(payload.data);

      state.products = payload.data as any;
    });
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.products.Product = state.products.Product.filter(
        (item) => item._id !== payload
      );
    });

    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.product = payload as Product;
    });

    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      state.products.Product = state.products?.Product?.map((item) =>
        item._id === payload?._id ? payload : item
      ) as Product[];
    });
  },
});

export default productsSlice.reducer;
export const { setPage } = productsSlice.actions;
