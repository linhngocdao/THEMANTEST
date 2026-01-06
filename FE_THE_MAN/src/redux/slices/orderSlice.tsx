import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { removeCart } from "../../api-cilent/Cart";
import {
  AddOrderApi,
  countProductApi,
  findOrder,
  GetOrdersApi,
  readOrdertApi,
  removeOrderApi,
  UpdateQuantityCart,
  UpdateQuantityCart2,
  updateStatusOrderApi,
} from "../../api-cilent/Orders";
import { get } from "../../api-cilent/Product";
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
  async (id: string) => {
    try {
      const res = await axios.post(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail",
        id,
        {
          headers: {
            Token: "755b4fbb-5918-11ed-bd1f-1a28f04fff2f",
          },
        }
      );
      return res.data;
    } catch (err) {
      return {
        log: [
          {
            status: "",
          },
        ],
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
          ShopId: 120366,
          Token: "755b4fbb-5918-11ed-bd1f-1a28f04fff2f",
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
  if (resp.data.order_code) {
    console.log(id);

    console.log(resp);
  }

  if (resp.data.order_code) {
    const { data } = await axios.post(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail",
      {
        order_code: resp.data.order_code,
        // order_code: "LLU7GH",
      },
      {
        headers: {
          Token: "755b4fbb-5918-11ed-bd1f-1a28f04fff2f",
        },
      }
    );
    console.log(data?.data?.status);

    if (data?.data?.status === "delivered") {
      return true;
    }
    return false;
    // console.log(data);
  }
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
            ShopId: 120366,
            Token: "755b4fbb-5918-11ed-bd1f-1a28f04fff2f",
          },
        }
      );
      return res.data;
    } catch (er:any) {
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
      builder.addCase(orderConfirm.fulfilled, (state, { payload }) => {
      }),
      builder.addCase(updateOrder.fulfilled, (state, { payload }) => {
        state.orders = state.orders.map((item: any) =>
          item._id === payload?._id ? payload : item
        );
      }),
      builder.addCase(infoOrder.fulfilled, (state, { payload }) => {
        state.orderinfo = payload;
      }),
      builder.addCase(cancelOrder.fulfilled, (state, { payload }) => {}),
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
