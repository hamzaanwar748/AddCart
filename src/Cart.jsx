import React from "react";
import { addCartStore, Store } from "./ProductStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const Cart = () => {
  if (addCartStore.Addcart?.length !== 0) {
    return (
      <div>
        <div>
          {addCartStore.Addcart.map((i, index) => {
            return (
              <div key={index} className="flex justify-center items-center">
                <div className="lg:w-[700px] md:px-20 sm:px-20 lg:flex lg:flex-row lg:items-center md:flex md:flex-row md:items-center sm:flex sm:flex-row sm:items-center flex flex-col p-28 mx-6 bg-gray-100  lg:my-5 lg:py-5 md:my-5 md:py-5 sm:my-5 sm:py-5 rounded-md">
                  <div className="  ">
                    <img
                      className="w-28 rounded-full h-28 p-2 bg-white ml-2 mr-4"
                      src={i.image}
                      alt=""
                    />
                  </div>
                  <p>{i.title}</p>
                  <div className="flex justify-end ml-auto float-right mr-5 items-center">
                    <div className="flex items-center mr-12">
                      <p className="mr-3 ml-5">{i.quantity}</p>
                      <div className="flex flex-col ">
                        <button
                          onClick={() => {
                            addCartStore.quantityIncre1(i.id);
                          }}
                          className="w-[25px] h-[25px] text-white  text-center rounded-full mb-2 bg-gray-600"
                        >
                          +
                        </button>
                        <button
                          onClick={() => {
                            addCartStore.quantityDicre1(i.id);
                            Store.products.map((product) => {
                              if (product.id == i.id) {
                                Store.quantityDicre(i.id);
                              }
                            });
                          }}
                          className="w-[25px] h-[25px] text-white  text-center rounded-full bg-gray-600"
                        >
                          -
                        </button>
                      </div>
                    </div>

                    <p className="text-sm">{parseInt(i.price * i.quantity)}$</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      addCartStore.removeProduct(i);
                      Store.HandleQuantity(i.id);
                    }}
                    className="text-2xl font-thin ml-6"
                  >
                    x
                  </button>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center items-center">
            <Link to={"/"}>
              <div className="text-center cursor-pointer mx-12">
                {"<--"} Back to home page
              </div>
            </Link>
            <div className="mx-12">
              SubTotal:{" "}
              <span className="font-bold">
                {parseInt(addCartStore.totalPrice)}$
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center mt-36">
        <p className="text-3xl mb-5">Please add some products</p>

        <Link
          to={"/"}
          className="bg-orange-500 p-2 text-white rounded-md hover:bg-transparent hover:text-orange-500 hover:border hover:border-orange-500"
        >
          Go to products
        </Link>
      </div>
    );
  }
};

export default observer(Cart);
