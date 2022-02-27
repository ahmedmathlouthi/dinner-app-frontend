import React from "react";
import Recipe from "./Recipe";

const RecipeList = (props) => {
  const { recipeList, isLoading, error } = props;

  if (error) {
    return <p style={{ color: "red" }}>error</p>;
  }
  return isLoading ? (
    <p> loading...</p>
  ) : (
    <div className="grid gap-2 grid-cols-3 flex justify-center align-center">
      {!!recipeList?.data &&
        recipeList.data.map((recipe) => {
          return <Recipe recipe={recipe} key={recipe.id} />;
        })}
      {!recipeList?.data?.length && <p>the list is empty</p>}
    </div>
  );
};

export default RecipeList;
