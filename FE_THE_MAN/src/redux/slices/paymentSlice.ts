import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUrlPaymentApi } from "../../api-cilent/payment";

type Ipayment = {
  payment: {},
};

const initialState: Ipayment = {
  payment: {},

};




export const createUrlPayment = createAsyncThunk("payment/createurlpayment", async (data: any) => {
  const res = await createUrlPaymentApi(data)
  return res.data

})


const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUrlPayment.fulfilled, (state, { payload }) => {

    })
  },
});

export default PaymentSlice.reducer;
