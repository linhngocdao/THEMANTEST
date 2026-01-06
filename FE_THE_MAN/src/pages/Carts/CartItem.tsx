import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberFormat from "react-number-format";
import { useDispatch } from "react-redux";
import {
  changeQuantity,
  Decrement,
  Increment,
  RemoveCart,
} from "../../redux/slices/cartSlice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface CartItemProps {
  item: any;
  id: any;
}

export default function CartItem(props: CartItemProps) {
  const { item, id } = props;
  const dispatch = useDispatch<any>();
  const [inputValue, setInputValue] = useState<number>();
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    if (item?.quantity != inputValue) {
      setInputValue(item.quantity);
    }
  }, [item]);
  const IncrementC = async (data: any) => {
    setDisabled(() => true);
    const product = {
      ...data,
      userID: id,
    };
    await dispatch(Increment(product));
    setDisabled(false);
  };

  const RemoveCartClient = async (data: any) => {
    setDisabled(true);
    const product = {
      ...data,
      userID: id,
    };
    await dispatch(RemoveCart(product));
    setDisabled(false);
  };

  const DecrementC = async (data: any) => {
    setDisabled(true);
    const product = {
      ...data,
      userID: id,
    };
    await dispatch(Decrement(product));
    setDisabled(false);
  };

  const onBlurQuantity = async (data: any, e: any) => {
    setDisabled(true);
    setInputValue(parseInt(e.target.value));
    const product = {
      ...data,
      userID: id,
      quantitychange: parseInt(e.target.value),
    };
    await dispatch(changeQuantity(product));
    setDisabled(false);
  };

  return (
    <tr className="border-t-2">
      <td className="flex py-10  gap-8">
        <img src={item.image} className="w-20"></img>
        <div className="pt-7">
          <p>{item.name}</p>
          <p className="font-bold">
            {" "}
            <NumberFormat
              value={item?.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={""}
            />{" "}
            VNĐ
          </p>
        </div>
      </td>
      <td className="w-40">
        <div className="font-bold flex">
          {" "}
          <div
            style={{ backgroundColor: `${item.color}` }}
            className="h-[20px] w-[20px] rounded-[50%] border-[1px] border-black"
          ></div>{" "}
          / {item.size}
        </div>
      </td>
      <td className="mr-[300px]">
        <div className="inline-block h-[32px]">
          <button disabled={isDisabled}
            onClick={() => DecrementC(item)}
            className={clsx(
              "bg-white-300 border-[rgba(0,0,0,.09)] border-2 h-[32px] w-[30px] text-black",
              { "text-[#ccc]": isDisabled }
            )}
          >{`-`}</button>

          <input
            disabled={isDisabled}
            onBlur={(e) => onBlurQuantity(item, e)}
            type="number"
            defaultValue={item.quantity}
            value={inputValue}
            onChange={(e) => setInputValue(parseInt(e.target.value))}
            //   onChange={(e) => onChangeQuantity(item, e)}
            className={clsx(
              "w-[50px] h-[32px] border-[rgba(0,0,0,.09)]  border-2 text-center",
              { "text-[#ccc]": isDisabled }
            )}
          />

          <button
            disabled={isDisabled}
            onClick={() => IncrementC(item)}
            className={clsx(
              "bg-white-300 border-[rgba(0,0,0,.09)] border-2 h-[32px] w-[30px] text-black",
              { "text-[#ccc]": isDisabled }
            )}
          >{`+`}</button>
        </div>
      </td>
      <td className="font-bold">
        {" "}
        <NumberFormat
          value={item?.price * item?.quantity}
          displayType={"text"}
          thousandSeparator={true}
          prefix={""}
        />{" "}
        VNĐ
      </td>
      <td>
        <button>
          <i className="fa-sharp fa-solid fa-circle-xmark text-slate-300 bg-black rounded-full shadow-md shadow-black text-3xl"></i>
        </button>
      </td>
      <td className="text-slate-400 text-base">
        <FontAwesomeIcon
          className="cursor-pointer"
          icon={faTrash}
          onClick={() => RemoveCartClient(item)}
        />
      </td>
    </tr>
  );
}
