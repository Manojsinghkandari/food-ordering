import React, { useEffect } from "react";
import FoodCard from "./FoodCard";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllContent } from "../redux/slices/ContentSilce";

const FoodItems = () => {
  const dispatch = useDispatch();
  const { loading, Contents } = useSelector((state) => state.content);
  const category = useSelector((state) => state.category.category);
  const handleToast = (name) => toast.success(`Added ${name} `);

  useEffect(() => {
    dispatch(getAllContent());
  }, []);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-wrap gap-10 justify-center lg:justify-start mx-6 my-10">
        {Contents?.contents
          ?.filter((food) => {
            if (category === "All") {
              return food;
            } else {
              return category === food.category;
            }
          })
          .map((food) => (
            <FoodCard
              key={food.id}
              id={food._id}
              name={food.name}
              price={food.price}
              description={food.description}
              rating={food.rating}
              img={food.img}
              handleToast={handleToast}
            />
          ))}
      </div>
    </>
  );
};

export default FoodItems;
