import { Recipe } from './recipe';
import { RecipesRepository } from './recipes.repository';

import * as data from './data.json';

export class RecipesRepositoryFake implements RecipesRepository {
  async getRecipes(): Promise<Recipe[]> {
    return data.recipes.slice(0, 2); // Returns the two firsts recipes inside data.json
  }
}
