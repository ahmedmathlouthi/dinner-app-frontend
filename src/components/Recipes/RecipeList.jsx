import React from "react";
import Recipe from "./Recipe";

const RecipeList = (props) => {
  const { recipeList, isLoading } = props;

  return isLoading ? (
    <p> loading...</p>
  ) : (
    <div className="grid gap-2 grid-cols-3 flex justify-center align-center">
      {!!recipeList?.data &&
        recipeList.data.map((recipe) => {
          return <Recipe recipe={recipe} />;
        })}
    </div>
  );
};

export default RecipeList;
