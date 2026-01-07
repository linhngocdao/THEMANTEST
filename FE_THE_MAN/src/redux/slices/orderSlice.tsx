import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  findOrder,
  GetOrdersApi,
  readOrdertApi,
  removeOrderApi,
  UpdateQuantityCart2,
  updateStatusOrderApi
} from "../../api-cilent/Orders";
type orderState = {
  order: {};
  orders: any[];
  orderinfo: {};
  success: number;
  check: boolean;
};

const initialState: orderState = {
  order: {},
  orders: [],
  orderinfo: {},
  success: 0,
  check: false,
};

export const GHN_TOKEN = 'ac23f1a8-eae8-11f0-a3d6-dac90fb956b5'
export const SHOP_ID = 198976

// export const GHN_TOKEN = 'c26fbc83-124e-11ed-b136-06951b6b7f89'
// export const SHOP_ID = 198260

export const getOrders = createAsyncThunk("orders/getorders", async () => {
  const res = await GetOrdersApi();
  return res.data;
});

export const removeOrder = createAsyncThunk(
  "orders/removeorders",
  async (id: string) => {
    const res = await removeOrderApi(id);
    return res.data;
  }
);

export const infoOrder = createAsyncThunk(
  "orders/infoorder",
  async (orderCode: string) => {
    if (!orderCode) {
      console.log("infoOrder: Không có order_code, bỏ qua việc gọi API GHN");
      return {
        data: null,
        log: [{ status: "" }],
      };
    }

    console.log("Gọi API GHN để lấy thông tin đơn");
    console.log("order_code:", orderCode);

    try {
      const res = await axios.post(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail",
        {order_code: orderCode},
        {
          headers: {
            "Content-Type": "application/json",
            Token: GHN_TOKEN,
          },
        }
      );
      console.log("infoOrder Response:", res.data);
      return res.data;
    } catch (err: any) {
      console.log("infoOrder Error:", err?.response?.data);
      return {
        data: null,
        log: [{ status: "" }],
      };
    }
  }
);
export const cancelOrder = createAsyncThunk(
  "orders/cancleorders",
  async (data: any) => {
    const res = await axios.post(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          ShopId: String(SHOP_ID),
          Token: GHN_TOKEN,
        },
      }
    );
    return res.data;
  }
);
export const readOrder = createAsyncThunk(
  "orders/readorder",
  async (id: any) => {
    const res = await readOrdertApi(id);
    return res.data;
  }
);
export const isBuy = createAsyncThunk("orders/isBuy", async (id: any) => {
  const resp = await readOrdertApi(id);

  // Check if order is confirmed by admin (status=1) and paid (payment_status=1)
  if (resp.data.status === 1 && resp.data.payment_status === 1) {
    return true;
  }
  return false;
});
export const updateOrder = createAsyncThunk(
  "orders/updateorder",
  async (data: any) => {
    for (let index = 0; index < data.product?.length; index++) {
      const element = data.product[index];
      await UpdateQuantityCart2(element);
    }
    const res = await updateStatusOrderApi(data);
    return res.data;
  }
);
export const searchOrder = createAsyncThunk(
  "orders/search",
  async (code: string) => {
    const codes = {
      tm_codeorder: code,
    };
    let result = [];
    try {
      if (code) {
        const res = await findOrder(codes);
        if (res.data == null) {
          return (result = []);
        } else {
          result.push(res.data);
        }
      } else {
        const res = await GetOrdersApi();
        if (res.data == null) {
          result = [];
        } else {
          result = res.data;
        }
      }
      return result;
    } catch (error) {
      toast.info("Không tìm thấy!!!");
    }
    return result;
  }
);
export const orderConfirm = createAsyncThunk(
  "orders/orderconfirm",
  async (data: any) => {
    try {
      const res = await axios.post(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            ShopId: String(SHOP_ID),
            Token: GHN_TOKEN,
          },
        }
      );
      return res.data;
    } catch (er: any) {
      toast.error(er?.response?.data.code_message_value)
      toast.error(er?.response?.data.message)
    }

  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      state.orders = payload;
    }),
      builder.addCase(removeOrder.fulfilled, (state, { payload }) => {
        state.orders = state.orders.filter(
          (item: any) => item._id !== payload._id
        );
      }),
      builder.addCase(readOrder.fulfilled, (state, { payload }) => {
        state.order = payload;
      }),
      builder.addCase(isBuy.fulfilled, (state, { payload }) => {
        // console.log(payload);

        state.check = payload as boolean;
      }),
      builder.addCase(orderConfirm.fulfilled, () => {
      }),
      builder.addCase(updateOrder.fulfilled, (state, { payload }) => {
        state.orders = state.orders.map((item: any) =>
          item._id === payload?._id ? payload : item
        );
      }),
      builder.addCase(infoOrder.fulfilled, (state, { payload }) => {
        state.orderinfo = payload;
      }),
      builder.addCase(cancelOrder.fulfilled, () => { }),
      builder.addCase(searchOrder.fulfilled, (state, { payload }) => {
        console.log("searchOrder", payload);

        if (payload.length >= 1) {
          state.orders = payload;
        } else {
          state.orders = [];
        }
      });
  },
});

export default orderSlice.reducer;
