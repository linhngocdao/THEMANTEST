import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// export const GHN_TOKEN = 'c26fbc83-124e-11ed-b136-06951b6b7f89'
// export const SHOP_ID = 198260

export const GHN_TOKEN = 'ac23f1a8-eae8-11f0-a3d6-dac90fb956b5'
export const SHOP_ID = 198976

type Province = {
  province: [],
  district: [],
  ward: []
};

const initialState: Province = {
  province: [],
  district: [],
  ward: []

};


export const getProvince = createAsyncThunk("provinces/getprovinces", async () => {
  const res = await axios.get("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province", {
    headers: {
      'token': GHN_TOKEN
    }
  })
  return res.data.data

})
export const getDistrict = createAsyncThunk("provinces/getdistrict", async (id: number) => {
  const province = {
    'province_id': id
  }
  const res = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': GHN_TOKEN
    },
    body: JSON.stringify(province),
  }).then((response) => response.json())
    .then((data) => {
      return data
    }
    );
  return res.data
})
export const getWards = createAsyncThunk("province/getwards", async (id: number) => {
  const district = {
    'district_id': id
  }
  const res = await axios.post('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', JSON.stringify(district), {
    headers: {
      'Content-Type': 'application/json',
      'token': GHN_TOKEN
    },
  })
  return res.data.data

})

export const getSevicePackage = createAsyncThunk("province/getsevicepackage", async (data: number) => {
  const param = {
    'shop_id': SHOP_ID,
    'from_district': 1454,
    'to_district': data
  }
  const res = await axios.post("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services", param,
    {
      headers: {
        'Content-Type': 'application/json',
        'token': GHN_TOKEN
      }
    });
  return res.data.data

})


export const getFee = createAsyncThunk("province, getfee", async (data: any) => {

  try {
    const res = await axios.post("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee", data, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json, text/plain, */*',
        'token': GHN_TOKEN,
        'shop_id': String(SHOP_ID),
      }
    })
    return res.data.data
  } catch (error) {
    toast.error("Không lấy được phí giao hàng vui lòng thử lại sau")
  }

})

const provinceSlice = createSlice({
  name: "provinces",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProvince.fulfilled, (state, { payload }) => {
      state.ward = []
      state.district = []
      state.province = payload as any;
    });
    builder.addCase(getDistrict.fulfilled, (state, { payload }) => {
      state.district = []
      state.district = payload as any;
    });
    builder.addCase(getWards.fulfilled, (state, { payload }) => {
      state.ward = []
      state.ward = payload as any;
    });
    builder.addCase(getSevicePackage.fulfilled, () => {

    });
    builder.addCase(getFee.fulfilled, () => {

    });
  },
});

export default provinceSlice.reducer;
