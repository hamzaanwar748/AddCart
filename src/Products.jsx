import React, { useEffect } from "react";
import { Store } from "./ProductStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import Header from "./Header";

const Products = () => {
  useEffect(() => {
    Store.HandleData();
  }, []);

  return (
    <div className="mt-12">
      <Header />
      <div className="pt-12">
        {Store.products.map((i, index) => {
          return (
            <Link to={`/ProductDetails/${i.id}`} key={index}>
              <div className="md:flex md:flex-row md:items-center mx-8 px-3 sm:flex sm:items-center flex flex-col justify-center items-center bg-gray-100 lg:flex lg:flex-row lg:mx-[19rem] my-5 py-5 rounded-md">
                <div className="">
                  <img
                    className="w-28 rounded-full h-28 p-2 bg-white ml-2 mr-4"
                    src={i.image}
                    alt=""
                  />
                </div>
                <p>{i.title}</p>

                <p className="lg:flex lg:justify-end lg:ml-auto lg:float-right lg:mr-5 md:flex md:justify-end md:ml-auto md:float-right md:mr-5 ">
                  {parseInt(i.price)}$
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default observer(Products);
