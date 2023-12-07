export interface RecipeDto {
  id: string;
  name: string;
  description: string;
  pictureUrl: string;
  steps: Array<string>;
  ingredients: Array<string>
}

export interface RecipeResponseDto {
  items: RecipeDto[];
}
