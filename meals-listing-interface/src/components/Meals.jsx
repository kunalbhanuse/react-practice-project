import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Meals.css";

function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axios.get(
          "https://api.freeapi.app/api/v1/public/meals",
        );
        setMeals(res.data.data.data);
      } catch (error) {
        console.log("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className="pageWrapper">
      <h1> Meals Explorer</h1>
      <div className="gridView">
        {meals.map((meal) => (
          <div className="card" key={meal.idMeal}>
            <div className="imaageContainer">
              <img src={meal.strMealThumb} alt={meal.strTags} />
            </div>
            <div className="content">
              <h2>{meal.strMeal}</h2>
              <p>
                {meal.strCategory} {meal.strArea}
              </p>
            </div>
            <button>View Recipe</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meals;
