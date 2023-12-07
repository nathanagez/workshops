import { JSONSyncPreset } from 'lowdb/node';
import { delay } from 'tsyringe';

import { Recipe } from './recipe';

import * as data from './data.json';

export interface RecipesRepository {
  getRecipes(): Promise<Recipe[]>;
}

class RecipesRepositoryImpl {
  private _db = JSONSyncPreset('recipes.db.json', {
    recipes: data.recipes,
  });

  constructor() {
    this._db.write();
  }

  async getRecipes(): Promise<Recipe[]> {
    this._db.read();
    return this._db.data.recipes;
  }
}

export const RECIPES_REPOSITORY_TOKEN = delay<RecipesRepository>(
  () => RecipesRepositoryImpl
);
