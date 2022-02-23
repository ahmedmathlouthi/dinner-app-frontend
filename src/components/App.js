import "../tailwind.css";
import RecipeList from "./Recipes/RecipeList";
import MultiInput from "./CommonUi/MultiInput";
import { useState, useEffect } from "react";
import * as API from "../queries/api";

function App() {
  const [chips, setChips] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const addChip = async (value) => {
    setChips((prevState) => [...prevState, value]);
  };

  const onRemove = (index) => {
    setChips((prevState) =>
      prevState.filter((el, Innerindex) => Innerindex !== index)
    );
  };

  const getRecipes = async () => {
    const data = await API.getRecipeList();
    setRecipeList(data);
    setLoading(false);
  };

  const searchByIngredients = async () => {
    if(chips){
      setLoading(true);
      const data = await API.searchByIngredients(chips);
      setRecipeList(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    try {
      getRecipes();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  return (
    <div className="App">
      <MultiInput
        chips={chips}
        onSubmit={addChip}
        onRemove={onRemove}
        submitQuery={searchByIngredients}
      />
      <RecipeList recipeList={recipeList} isLoading={isLoading} />
    </div>
  );
}

export default App;
