import React from "react";

const Recipe = (props) => {
  const { recipe } = props;

  return (
    <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div className="flex justify-center md:justify-end -mt-16">
        <img
          className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
          src={recipe.image}
          loading="lazy"
        />
      </div>
      <div>
        <h2 className="text-gray-800 text-3xl font-semibold">{recipe.title}</h2>
        <p className="mt-2 text-gray-600">
          {recipe.ingredients.map((ingredient) => {
            return <li>{ingredient}</li>;
          })}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <a href="#" className="text-xl font-medium text-indigo-500">
          {recipe.author}
        </a>
      </div>
    </div>
  );
};

export default Recipe;
