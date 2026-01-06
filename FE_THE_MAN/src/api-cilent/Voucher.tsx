import instance from "./Config";
export const checkVoucherApi = (data: any) => {
  return instance.put("/checkvoucher", data);
};
export const removeVoucherApi = (id: any) => {
    return instance.delete("/discounts/"+id);
};
  
export const addVoucherApi = (data: any) => {
    return instance.post("/discounts/",data);
};

export const getVouchersApi = () => {
  return instance.get("/discounts");
}

export const getVoucherApi = (id: any) => {
  return instance.get("/discounts/"+id)
}

export const updateVoucherApi = (data: any) => {
  return instance.put("/discounts/"+data._id, data)
}