export interface Recipe {
  id: string;
  name: string;
  pictureUri?: string;
  ingredients?: string[];
  steps?: string[];
}

export function createRecipe(recipe: Recipe) {
  return recipe;
}
