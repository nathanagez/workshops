import { Recipe } from "../recipes/recipe";

export interface Meal {
  id: string;
  recipe: Array<Recipe>;
}