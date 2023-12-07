import { Router } from 'express';
import { inject } from '../di';
import {RECIPES_REPOSITORY_TOKEN} from "./recipes.repository";
import {RecipeResponseDto} from "@whiskmate/shared";

export const recipesRouter = Router();

recipesRouter.get('/recipes', async (_, res) => {
  const repo = inject(RECIPES_REPOSITORY_TOKEN);

  const body: RecipeResponseDto = {
    items: await repo.getRecipes(),
  };

  res.send(body);
});
