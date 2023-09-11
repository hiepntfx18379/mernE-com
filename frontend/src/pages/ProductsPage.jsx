import React, { useState } from "react";
import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";
import bannerShop from "../asset/bannerShop.jpg";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const catagoryData = searchParams.get("category");
  const [data, setData] = useState();

  const [textSearch, setTextSearch] = useState("");
  const params = useParams();

  const [sortProduct, setSortProduct] = useState("Default");

  return (
    <>
      <div>
        <div className="w-100 h-auto -mb-10">
          <img src={bannerShop} />
          <div className="absolute top-[135px] left-[41%]  tracking-widest ">
            <div className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Shop
            </div>
          </div>
        </div>

        <div className="container">
          <div className="block-grid-categories">
            <div className=" title-category col-span-1 uppercase text-2xl text-main-title mt-2">
              Categories
            </div>
            <div className=" col-span-4 flex justify-between ">
              <input
                type="text"
                placeholder="Search for"
                className="border-element"
                value={textSearch}
              />
              <select className="border-element">
                <option value="default">default sorting</option>
                <option value="price">price (Hight-Low)</option>
              </select>
            </div>
          </div>

          <div className="block-grid-categories">
            <nav className="col-span-1">
              <div className="box-category w-100">
                <div className="main-category">Apple</div>

                <Link to="All" className="sub-category link">
                  All
                </Link>

                <div className=" n-category">iphone & mac</div>
                <div className="flex flex-col">
                  <Link to="iphone" className="sub-category link">
                    Iphone
                  </Link>
                  <Link to="ipad" className="sub-category link">
                    Ipad
                  </Link>
                </div>

                <div className=" n-category">Wireless</div>
                <div className="flex flex-col ">
                  <Link to="airpod" className="sub-category link">
                    Airpod
                  </Link>
                  <Link to="watch" className="sub-category link">
                    Watch
                  </Link>
                </div>

                <div className=" n-category">other</div>
                <div className="flex flex-col">
                  <Link className="sub-category link">Mouse</Link>
                  <Link className="sub-category link">Keyboard</Link>
                  <Link className="sub-category link">Other</Link>
                </div>
              </div>
            </nav>
            <div className="col-span-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
