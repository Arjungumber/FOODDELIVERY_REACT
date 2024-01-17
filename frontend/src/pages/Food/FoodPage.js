import React, { useEffect, useState } from "react";
import classes from "./foodPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../../services/foodService";
import StarRating from "../../components/StarRating/StarRating";
import Tags from "../../components/Tags/Tags";
import Price from "../../components/Price/Price";
import { useCart } from "../../hooks/useCart";
import NotFound from "../../components/NotFound/NotFound";

export default function FoodPage() {
  const [food, setFood] = useState({});
  const { id } = useParams(); // it will give us the id that is inside the route
  const {addToCart} = useCart();
  const navigate = useNavigate();

  // alse we want to navigate user to the cart page for which we goona use usenavigate hook of react
const handleAddToCart = () =>{
  addToCart(food);
navigate('/cart');
}

  useEffect(() => {
    getById(id).then(setFood);
  }, [id]); // id is the dependency list for this function.

  return (
    <>
      {/* if we've found the food */}
      {!food ? (<NotFound message="Food Not Found" linkText="Back To HomePage"></NotFound>) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`${food.imageUrl}`}
            alt={food.name}
          />
          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? "" : classes.not
                }`}
              >
                ❤
              </span>
            </div>
            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25}></StarRating>
            </div>
            <div className={classes.origins}>
              {food.origins?.map((origin) => (
                <span key={origin}> {origin}</span>
              ))}
            </div>
            <div className={classes.tags}>
              {food.tags && (
                <Tags tags={food.tags.map((tag) => ({ name: tag }))}
                forFoodPage={true}
                 />
              )}
            </div>
            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>
            <div className={classes.price}>
              <Price price={food.price}/>
            </div>
            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}
