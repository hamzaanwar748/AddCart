import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Store, addCartStore } from "./ProductStore";
import { observer } from "mobx-react-lite";
import Header from "./Header";
import ReactLoading from "react-loading";

const ProductDetails = () => {
  const { productId } = useParams();
  const [res, setRes] = useState(null);
  useEffect(() => {
    Store.HandleData();
  }, []);

  useEffect(() => {
    if (Store.products.length) {
      setRes(Store.products.find((i) => i.id == productId));
    }
  }, [Store.products.length]);

  const HandleIncrement = () => {
    const resdata = addCartStore.Addcart.find((i) => i.id == res.id);
    if (resdata) {
      addCartStore.quantityIncre1(res.id);
    }
    Store.quantityIncre(res.id);
  };

  const HandleDicrement = () => {
    const resData = addCartStore.Addcart.find((i) => i.id == res.id);
    if (resData) {
      addCartStore.quantityDicre1(res.id);
    }
    Store.quantityDicre(res.id);
  };

  const productQuantity = () => {
    const cartProduct = addCartStore.Addcart?.find((i) => i.id == res.id);
    return cartProduct ? cartProduct.quantity : res?.quantity;
  };

  return (
    <>
      <Header />
      <div className="mx-7">
        <div className="pt-12">
          <div className="pt-28 lg:mx-48 md:mx-20 flex justify-center items-center rounded-md mt-12 bg-gray-100 px-8 ">
            {res?.id ? (
              <div className="lg:flex">
                <div className="mr-12">
                  <img
                    className="lg:w-96 lg:mt-[-61px] mb-6 lg:rounded-full rounded-lg lg:h-96 lg:p-7 bg-white"
                    src={res.image}
                    alt=""
                  />
                </div>
                <div>
                  <p className="font-bold mb-4">{res.title}</p>
                  <p className="lg:w-64 md:w-64 text-justify mb-4 font-thin">
                    {res.description}
                  </p>

                  <p className="mb-2 font-bold">
                    {parseInt(res.price * productQuantity())}$
                  </p>
                  <div>
                    <div className="flex items-center mr-12">
                      <div className="flex">
                        <button
                          onClick={HandleIncrement}
                          className="w-[25px] h-[25px] text-white  text-center rounded-full mb-2 bg-gray-600"
                        >
                          +
                        </button>
                        <p className="px-2">{productQuantity()}</p>

                        <button
                          onClick={HandleDicrement}
                          className="w-[26px] h-[26px] text-white  text-center rounded-full bg-gray-600"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => addCartStore.addToCart(res)}
                    className="bg-orange-500 text-white p-2 rounded-md mb-4"
                  >
                    Add cart
                  </button>
                </div>
              </div>
            ) : (
              <ReactLoading type="balls" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(ProductDetails);
