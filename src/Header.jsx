import React from "react";
import { Link } from "react-router-dom";
import { addCartStore } from "./ProductStore";
import { HiShoppingCart } from "react-icons/hi2";
import { observer } from "mobx-react-lite";

const Header = () => {
  return (
    <div>
      <div>
        <div className="mb-12 flex justify-end ml-auto float-right lg:mr-56 mt-7">
          <Link to={"/Cart"}>
            <div className="flex justify-center items-center">
              <HiShoppingCart className="text-5xl " />
              <span className="bg-black text-white rounded-full text-center mt-6 ml-[-8px] pt-[2px] w-6 h-6  mx-1 text-sm">
                {addCartStore.Addcart?.length}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default observer(Header);
