import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  orderCount,
  thongKeByDate,
  thongKeByMonth,
  thongKeByYear,
  thongkeSoluong,
  thongke_tong,
} from "../../api-cilent/Statistical";

type Statistical = {
  data: {};
  quantity: {};
  confirmed: Number;
  canceled: Number;
  unconfimred: Number;
};

const initialState: Statistical = {
  data: {},
  quantity: {},
  confirmed: 0,
  canceled: 0,
  unconfimred: 0,
};

export const statistical_total = createAsyncThunk(
  "statistical/total",
  async () => {
    const response = await thongke_tong();
    return response.data;
  }
);
export const statisticarQuantity = createAsyncThunk(
  "statistical/quantity",
  async () => {
    const response = await thongkeSoluong();
    return response.data;
  }
);
export const confirmedCount = createAsyncThunk(
  "statistical/confirmed",
  async () => {
    const response = await orderCount("1");
    return response.data;
  }
);
export const canceledCount = createAsyncThunk(
  "statistical/canceled",
  async () => {
    const response = await orderCount("2");
    return response.data;
  }
);
export const unconfimredCount = createAsyncThunk(
  "statistical/unconfimred",
  async () => {
    const response = await orderCount("0");
    return response.data;
  }
);
const statisticalReducer = createSlice({
  name: "statistical",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(statistical_total.fulfilled, (state, { payload }) => {
      console.log(payload);

      state.data = payload as any;
    });
    builder.addCase(statisticarQuantity.fulfilled, (state, { payload }) => {
      state.data = payload as any;
    });
    builder.addCase(confirmedCount.fulfilled, (state, { payload }) => {
      state.confirmed = payload as any;
    });
    builder.addCase(canceledCount.fulfilled, (state, { payload }) => {
      state.canceled = payload as any;
    });
    builder.addCase(unconfimredCount.fulfilled, (state, { payload }) => {
      state.unconfimred = payload as any;
    });
  },
});

export default statisticalReducer.reducer;
