export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  steps: string[];
  pictureUri?: string;
}

export interface Ingredient {
  name: string;
  quantity?: number;
  unit?: string;
}
