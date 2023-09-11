import React from "react";
import {
  IoCaretBackSharp,
  IoCaretForwardSharp,
  IoTrashBinSharp,
} from "react-icons/io5";

const ProductRow = ({ picked, incre, decre, del }) => {
  return (
    <tr>
      <td>
        <img src={picked.photos[1]} alt="" />
      </td>
      <td className=" font-semibold">{picked.name}</td>
      <td>
        {new Intl.NumberFormat("en-DE").format(picked.price)}
        <br />
        VND
      </td>
      <td>
        <span className="flex text-black py-1 pr-5 justify-center ml-6">
          <button onClick={() => decre(picked._id)}>
            <IoCaretBackSharp />
          </button>
          <span className=" box-border text-sm mt-1 px-2  ">
            {picked.quantity}
          </span>
          <button onClick={() => incre(picked._id)}>
            <IoCaretForwardSharp />
          </button>
        </span>
      </td>
      <td>
        {new Intl.NumberFormat("en-DE").format(picked.price * picked.quantity)}
        <br />
        VND
      </td>
      <td>
        <IoTrashBinSharp
          className="h-8 w-8 ml-6"
          onClick={() => del(picked._id)}
        />
      </td>
    </tr>
  );
};

export default ProductRow;
