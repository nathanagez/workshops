import { Router } from 'express';
import { inject } from '../di';
import {RECIPES_REPOSITORY_TOKEN} from "./recipes.repository";
import {RecipeResponseDto} from "@whiskmate/shared";

import { Recipe } from './recipe';

export const recipesRouter = Router();

const filterRecipes = (recipes: Array<Recipe>, filter: string) => {
  return recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(filter.toLowerCase());
  });
}

recipesRouter.get('/recipes', async (req, res) => {
  const repo = inject(RECIPES_REPOSITORY_TOKEN);

  const filter: string = req.query?.filter as string;

  const body: RecipeResponseDto = {
    items: filter ? filterRecipes(await repo.getRecipes(), filter) : await repo.getRecipes(),
  };

  res.send(body);
});
