import { JSONSyncPreset } from 'lowdb/node';
import { delay } from 'tsyringe';

import { Meal } from './meal';

//import * as data from './data.json';

export interface MealsRepository {
  getMeals(): Promise<Meal[]>;
}

class MealsRepositoryImpl {
  private _db = JSONSyncPreset('meals.db.json', {
    meals: [
        { 
          id: 'meal_1',
          recipes: []
        },
      ]
  });

  constructor() {
    this._db.write();
  }

  async getMeals(): Promise<Meal[]> {
    this._db.read();
    return this._db.data.meals;
  }
}

export const MEALS_REPOSITORY_TOKEN = delay<MealsRepository>(
  () => MealsRepositoryImpl
);
