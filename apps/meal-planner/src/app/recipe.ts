export interface Ingredient {
  name: string;
}

export interface Recipe {
  id: string;
  name: string;
  pictureUri: string;
  description?: string;
  ingredients?: Ingredient[];
  steps?: string[];
}
