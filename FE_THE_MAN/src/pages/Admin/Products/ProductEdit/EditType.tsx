import { useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { HiOutlineX } from "react-icons/hi";
import { Inputs, IType } from ".";

export default function EditType() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<Inputs>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "type",
  });

  const addNewType = () => {
    append({ color: "", size: "", quantity: 1 });
  };

  const removeType = (index: number) => () => {
    remove(index);
  };

  return (
    <div>
      <button
        type="button"
        onClick={addNewType}
        className="border px-4 py-1 rounded-md"
      >
        Add Type
      </button>
      {fields.map((type, index) => (
        <div key={type.id} className="flex gap-x-4 items-center">
          <input placeholder="Color"
            type="text"
            {...register(`type.${index}.color`, { required: "Không được để trống" })}
            className="shadow-sm focus:outline-none focus:ring-[#4D535E] focus:border-[#4D535E] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
          />
          {errors.type && errors.type[index]?.color?.message}
          <input placeholder="Size"
            {...register(`type.${index}.size`, { required: "Không được để trống" })}
            className="shadow-sm focus:outline-none focus:ring-[#4D535E] focus:border-[#4D535E] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
          />
          {errors.type && errors.type[index]?.size?.message}
          <input placeholder="Số lượng"
            type="number"
            {...register(`type.${index}.quantity`, { required: "Không được để trống" })}
            className="shadow-sm focus:outline-none focus:ring-[#4D535E] focus:border-[#4D535E] mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
          />
          {errors.type && errors.type[index]?.quantity?.message}
          <HiOutlineX
            className="text-[54px] mr-2 cursor-pointer"
            onClick={removeType(index)}
          />
        </div>
      ))}
    </div>
  );
}
