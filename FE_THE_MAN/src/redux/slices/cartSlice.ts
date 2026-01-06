import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addcart,
  readcart,
  removeCart,
  updateCart,
} from "../../api-cilent/Cart";
import { AddOrderApi, countProductApi, UpdateQuantityCart } from "../../api-cilent/Orders";
import { get } from "../../api-cilent/Product";
import { checkVoucherApi } from "../../api-cilent/Voucher";

interface Icart {
  cart: {};
  carts: {};
}
const initialState: Icart = {
  cart: {},
  carts: {},
};

export const readCart = createAsyncThunk(
  "carts/readcart",
  async (iduser: string) => {
    const res = await readcart(iduser);
    return res.data;
  }
);
export const Increment = createAsyncThunk(
  "carts/increment",
  async (product: any) => {
    const { data } = await readcart(product.userID);
    const { data: producta } = await get(product._id);

    const quantityold = producta.type.find(
      (item: any) => item.color == product.color && item.size == product.size
    );
    const cartnew = data.products.find(
      (item: any) =>
        item._id == product._id &&
        item.color == product.color &&
        item.size == product.size
    );

    if (cartnew.quantity < quantityold.quantity) {
      cartnew.quantity++;
    } else {
      toast.info("Sản phẩm này chỉ còn " + quantityold.quantity);
    }
    return data;
  }
);

export const changeQuantity = createAsyncThunk(
  "carts/changequantity",
  async (product: any) => {
    const { data } = await readcart(product.userID);
    const { data: producta } = await get(product._id);

    const quantityold = producta.type.find(
      (item: any) => item.color == product.color && item.size == product.size
    );
    const cartnew = data.products.find(
      (item: any) =>
        item._id == product._id &&
        item.color == product.color &&
        item.size == product.size
    );
    // console.log("product.quantitychange", product.quantitychange);

    cartnew.quantitychange = product.quantitychange;
    if (product.quantitychange > 0) {
      if (product.quantitychange <= quantityold.quantity) {
        cartnew.quantity = product.quantitychange;
      } else {
        cartnew.quantity = quantityold.quantity
        toast.info("Sản phẩm này chỉ còn " + quantityold.quantity);
      }
    } else {
      toast.info("Số lượng sản phẩm phải lớn hơn 0");
      cartnew.quantity = 1
    }
    return data;
  }
);

export const Decrement = createAsyncThunk(
  "carts/decrement",
  async (product: any) => {
    const { data } = await readcart(product.userID);
    const cartnew = data.products.find(
      (item: any) =>
        item._id == product._id &&
        item.color == product.color &&
        item.size == product.size
    );
    if (cartnew.quantity <= 1) {
      const confirm = window.confirm("Bạn có muốn xoá không?");
      if (confirm) {
        const cartnewa = data.products.filter((item: any) => item !== cartnew);
        data.products = cartnewa;
        toast.info("Xoá thành công?");
      }
    } else {
      cartnew.quantity--;
    }
    return data;
  }
);



export const updateCartRd = createAsyncThunk("carts/updatecart", async (data:any) => {
      const res = await updateCart(data)
      console.log("res",res);
      return res.data
      
})

export const RemoveCart = createAsyncThunk(
  "carts/removecart",
  async (product: any) => {
    const { data } = await readcart(product.userID);
    const cartnew = data.products.find(
      (item: any) =>
        item._id == product._id &&
        item.color == product.color &&
        item.size == product.size
    );
    
      const confirm = window.confirm("Bạn có muốn xoá không?");
      if (confirm) {
        const cartnewa = data.products.filter((item: any) => item !== cartnew);
        data.products = cartnewa;
        toast.info("Xoá thành công?");
      }
     
    return data;
  }
);


export const addToCart = createAsyncThunk(
  "carts/addtocart",
  async (carts: any) => {
    console.log("ccc",carts);
    
    const { data } = await readcart(carts.userID);
    let cart = {
      products: [],
      userID: {},
      tm_codeorder: String
    };
    if (data) {
      cart = data;
    } else {
      cart = {
        products: [],
        userID: {},
        tm_codeorder: String
      };
    }
    if (cart?.products?.length > 0) {
      const exitsID = cart.products.find(
        (item: any) => item._id === carts.products._id
      ) as any;
      const exitsColor = cart.products.find(
        (item: any) => item.color === carts.products.color
      );
      const exitsSize = cart.products.find(
        (item: any) => item.size === carts.products.size
      );
      if (!exitsID) {
        cart.products.push(carts.products as never);
      } else {
        if (!exitsColor || !exitsSize) {
          cart?.products.push(carts.products as never);
        } else {
          exitsID.quantity += carts.products.quantity;
        }
      }
      await updateCart(cart);
    } else {
      cart.products.push(...cart.products, carts.products as never);
      cart.userID = carts.userID;
      cart.tm_codeorder = carts.tm_codeorder
      const res = await addcart(cart);
      if(res?.data?.code == 409) {
          return {
            code: 409
          }
      }
      
    }
    return cart;
  }
);
export const addOrder = createAsyncThunk(
  "Users/addorder",
  async (data: any) => {
    let error = 0;
   
      for (let index = 0; index < data.product?.length; index++) {
        const element = data.product[index];

        const res = await countProductApi(element);
        if (res?.data?.code == 503) {
          error++;
          toast.error(res?.data?.message);
        }
      }

      if (error < 1) {
        const response = await AddOrderApi(data);
        const remove = await removeCart(data?._id);
        for (let index = 0; index < data.product?.length; index++) {
          const element = data.product[index];
          const res = await UpdateQuantityCart(element);
        }
        if(data?.voucher) {
          const raw = {
            update:true,
            _id: data?.voucher,
            iduser: data?.userID
          }
          await checkVoucherApi(raw)
        }
        return {
          code: 200, 
          message: "Success"
        }
      } else {
        return {
            code: 503,
            message: "Fail"
        }
      }

   
    
  }
);
const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(addToCart.fulfilled, (state, { payload }) => {
      state.carts = payload;
    }),
      build.addCase(readCart.fulfilled, (state, { payload }) => {
        state.carts = payload;
      }),
      build.addCase(Increment.fulfilled, (state, { payload }) => {
        state.carts = payload;
        updateCart(payload);
      }),
      build.addCase(changeQuantity.fulfilled, (state, { payload }) => {
        state.carts = payload;
        updateCart(payload);
      }),
      build.addCase(Decrement.fulfilled, (state, { payload }) => {
        state.carts = payload;
        updateCart(payload);
        if (payload.products.length <= 0) {
          removeCart(payload._id);
        }
      }),
      build.addCase(RemoveCart.fulfilled, (state, { payload }) => {
        state.carts = payload;
        updateCart(payload);
        if (payload.products.length <= 0) {
          removeCart(payload._id);
        }
      }),
      
      build.addCase(addOrder.fulfilled, (state, { payload }) => {
        
        
          if(payload?.code == 200) { 
            state.carts = {}
          }
      }),
      build.addCase(updateCartRd.fulfilled, (state, { payload }) => {
        console.log("payload,", payload);
        
        state.carts = payload
    })
  },
});
export default cartSlice.reducer;
