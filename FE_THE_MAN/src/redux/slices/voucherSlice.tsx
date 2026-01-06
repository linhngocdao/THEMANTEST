import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { addVoucherApi, checkVoucherApi, getVoucherApi, getVouchersApi, removeVoucherApi, updateVoucherApi } from "../../api-cilent/Voucher";

type Ivoucher = {
      voucher: {},
      vouchera: {},
      vouchers: any[],

};

const initialState: Ivoucher = {
    voucher: {},
    vouchera: {},
    vouchers: []
      
};



export const GETVoucherX = createAsyncThunk("voucher/getvoucherx", async (data:any) => {
    let response = {} as any
    if(data._id) {
      const res = await checkVoucherApi(data)
    if(res?.data?.code == 404) {
        return toast.error(res?.data?.message)
    }else if(res?.data?.code == 495) {
      return toast.error(res?.data?.message)
    }else if(res?.data?.code == 496) {
      return toast.error(res?.data?.message)
    }else if(res?.data?.code == 498) {
      return toast.error(res?.data?.message)
    }else if(res?.data?.code == 499) {
      return toast.error(res?.data?.message)
    }else if(res?.data?.code == 500) {
      return toast.error(res?.data?.message)
    }
     response = {
      ...res.data,
      code: 200
    }
    }else {
      response = {
        code:500
      }
    }  
    return response
})

export const checkVoucher = createAsyncThunk("voucher/checkvoucher", async (data:any) => {
    let response = {} as any
    
      const res = await checkVoucherApi(data)
    if(res?.data?.code == 404) {
        return toast.error(res?.data?.message)
    }else if(res?.data?.code == 495) {
      return toast.error(res?.data?.message)
    }else if(res?.data?.code == 496) {
      return toast.error(res?.data?.message)
    }else if(res?.data?.code == 498) {
      return toast.error(res?.data?.message)
    }else if(res?.data?.code == 499) {
      return toast.error(res?.data?.message)
    }else if(res?.data?.code == 500) {
      return toast.error(res?.data?.message)
    }
     response = {
      ...res.data,
      code: 200
    }
      
    return response
})

export const removeVoucher = createAsyncThunk("voucher/removevoucher", async () => {

})

export const addVoucher = createAsyncThunk("voucher/addvoucher",async (params:any) => {
          const res = await addVoucherApi(params)
          return res?.data
          
})
export const updateVoucher = createAsyncThunk("voucher/updatevoucer",async (params:any) => {
  const res = await updateVoucherApi(params)
  return res?.data
  
})

export const getVouchers = createAsyncThunk("voucher/getvouchers", async () => {
          const res = await getVouchersApi()
          return res.data        
})


export const removeVoucherData = createAsyncThunk("voucher/removevoucherdata", async (id:any) => {
              const res = await removeVoucherApi(id)
              return res.data
})
export const getVoucher = createAsyncThunk("voucher/getvoucher", async (id:any) => {
  const res = await getVoucherApi(id)
  return res.data
})

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(checkVoucher.fulfilled, (state, { payload }) => { 
          if(payload?.code  == 200){
            state.voucher = payload
          }
          
          
    }),
    builder.addCase(GETVoucherX.fulfilled, (state, { payload }) => { 
      if(payload?.code == 200){
        state.voucher = payload
      }
      if(payload?.code == 500){
        state.voucher = {}
      }
      
      
      
}),
    builder.addCase(removeVoucher.fulfilled, (state, {payload}) => {
            state.voucher = {
              amount: 0,
              percent: 0
            }     
    }),
    builder.addCase(addVoucher.fulfilled, (state, {payload}) => {
          if(payload?.result == 200) {
                state.vouchers.push(payload?.response as never)
          }
      
}),
    builder.addCase(getVouchers.fulfilled, (state,{payload}) => {
              state.vouchers = payload
    }),
    builder.addCase(removeVoucherData.fulfilled, (state,{payload}) => {
      state.vouchers = state.vouchers.filter((item:any) => item._id !== payload?.response?._id) as never
}),
builder.addCase(updateVoucher.fulfilled, (state,{payload}) => {
  state.vouchers = state.vouchers.map((item:any) => item._id === payload?.response?._id ? item:payload?.response) as never
})
builder.addCase(getVoucher.fulfilled, (state,{payload}) => {
  state.vouchera = payload
})
  },
});

export default voucherSlice.reducer;
