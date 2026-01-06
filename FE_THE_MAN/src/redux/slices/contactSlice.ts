import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, getAll, read, remove, update } from "../../api-cilent/Contact";
import { Contact } from "../../models/Contact";

type ContactType = {
  contacts: Contact[];
  contact: Contact | {};
};

const initialState: ContactType = {
  contacts: [],
  contact: {},
};

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id: string) => {
    const res = await remove(id);
    return res;
  }
);

export const readContact = createAsyncThunk(
  "contact/readContact",
  async (_id: string) => {
    const data = await read(_id);
    return data;
  }
);

export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async (contact: Contact) => {
    const data = await update(contact);
    console.log(data);
    return data;
  }
);
export const addContact = createAsyncThunk(
  "contact/addContact",
  async (contact: Contact) => {
    const data = await add(contact);
    console.log(data);
    return data;
  }
);
export const getAllContact = createAsyncThunk(
  "contact/getAllContact",
  async () => {
    const data = await getAll();
    return data;
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addContact.fulfilled, (state, { payload }) => {
      state.contacts.push(payload as Contact);
    });
    builder.addCase(getAllContact.fulfilled, (state, { payload }) => {
      state.contacts = payload || [];
    });
    builder.addCase(deleteContact.fulfilled, (state, { payload }) => {
      state.contacts = state.contacts.filter(
        (item) => item._id !== payload?._id
      );
    });
    builder.addCase(readContact.fulfilled, (state, { payload }) => {
      state.contact = payload as Contact;
    });
    builder.addCase(updateContact.fulfilled, (state, { payload }) => {
      state.contacts = state.contacts.map((item) =>
        item._id === payload?._id ? payload : item
      ) as Contact[];
    });
  },
});

export default contactSlice.reducer;
