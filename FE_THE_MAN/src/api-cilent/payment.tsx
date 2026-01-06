import instance from "./Config";



export const createUrlPaymentApi = (data:any) => {
            return instance.post("/create_payment_url",data)
}