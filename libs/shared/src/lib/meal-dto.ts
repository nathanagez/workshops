import { RecipeDto } from "./recipe-dto";

export interface MealDto {
  id: string;
  recipes: Array<RecipeDto>;
}

export interface MealResponseDto {
  items: MealDto[];
}
