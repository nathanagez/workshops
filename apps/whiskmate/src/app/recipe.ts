export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  steps: string[];
}

export interface Ingredient {
  name: string;
  quantity?: number;
  unit?: string;
}
