import { Recipe } from "../recipes/recipe";

export interface Meal {
  id: string;
  recipes: Array<Recipe>;
}