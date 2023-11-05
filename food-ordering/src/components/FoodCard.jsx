import React from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice";

const FoodCard = ({
  id,
  name,
  price,
  description,
  img,
  rating,
  handleToast,
}) => {
  const dispatch = useDispatch();
  const { isauthenticated } = useSelector((state) => state.auth);
  console.log(`http://localhost:3001${img}`);
  return (
    <div className="font-bold w-[250px] bg-white p-5 flex flex-col rounded-lg gap-2">
      <img
        src={`http://localhost:3001${img}`}
        alt=""
        className="w-auto h-[130px]  hover:scale-110 cursor-grab transition-all duration-500 ease-in-out "
      />
      <div className="text-sm flex justify-between">
        <h2>{name}</h2>
        <span className="text-orange-500 ">₹{price}</span>
      </div>
      <p className="text-sm font-normal">{description.slice(0, 50)}...</p>
      <div className="flex justify-between ">
        <span className="flex justify-center items-center">
          <AiFillStar className="mr-1 text-yellow-400" /> {rating}
        </span>
        {isauthenticated ? (
          <>
            <button
              onClick={() => {
                dispatch(
                  addToCart({ id, name, price, rating, price, img, qty: 1 })
                );
                handleToast(name);
              }}
              className="p-1 text-white bg-orange-500 hover:bg-green-600 rounded-lg text-sm"
            >
              Add to cart
            </button>
          </>
        ) : (
          <>
            <Link to={"/signin"}>
              <button className="p-1 text-white bg-orange-500 hover:bg-green-600 rounded-lg text-sm">
                Add to cart
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
