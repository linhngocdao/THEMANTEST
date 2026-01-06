import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, get, getAll, remove, update } from "../../api-cilent/Slider";

import { Slider } from "../../models/Slider";
import { useAppDispatch } from "../store";

type SlidersState = {
  Sliders: {
    count: number;
    Slider: Slider[];
  };
  Slider: Slider;
  page: number;
  limit: number;
};

const initialState: SlidersState = {
  Sliders: {
    count: 0,
    Slider: [],
  },
  page: 1,
  limit: 10,
  Slider: {},
};

export const getSliders = createAsyncThunk(
  "Sliders/getSliders",
  async (data: any) => {
    const response = await getAll(data.page, data.limit);
    return response;
  }
);

export const deleteSlider = createAsyncThunk(
  "Sliders/deleteSlider",
  async (_id: any) => {
    const data = await remove(_id);
    return _id;
  }
);

export const addSlider = createAsyncThunk(
  "Sliders/addSlider",
  async (Slider: any) => {
    const res = await add(Slider);
    return res;
  }
);

export const getSlider = createAsyncThunk(
  "Sliders/getSlider",
  async (id: any) => {
    const res = await get(id);
    return res;
  }
);

export const updateSlider = createAsyncThunk(
  "Sliders/updateSlider",
  async (Slider: any) => {
    const res = await update(Slider);
    return res;
  }
);

const SlidersSlice = createSlice({
  name: "Sliders",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSliders.fulfilled, (state, { payload }) => {
      state.Sliders = payload as any;
    });
    builder.addCase(deleteSlider.fulfilled, (state, { payload }) => {
      state.Sliders.Slider = state.Sliders.Slider.filter(
        (item) => item._id !== payload
      );
    });

    builder.addCase(getSlider.fulfilled, (state, { payload }) => {
      state.Slider = payload as Slider;
    });

    builder.addCase(updateSlider.fulfilled, (state, { payload }) => {
      state.Sliders.Slider = state.Sliders.Slider.map((item) =>
        item._id === payload?._id ? payload : item
      ) as Slider[];
    });
  },
});

export default SlidersSlice.reducer;
export const { setPage } = SlidersSlice.actions;
