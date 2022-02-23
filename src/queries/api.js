import API from "./index";

export async function getRecipeList() {
  try {
    const response = await API.get("/recipes");
    return response;
  } catch (error) {
    console.log("error", error);
  }
}


export async function searchByIngredients(params) {
  const queryParams = transformParams(params)

  try {
    const response = await API.get("/recipes?keys=" + queryParams);
    return response;
  } catch (error) {
    console.log("error", error);
  }
}


function transformParams(params){
  return params.join("&");
}
