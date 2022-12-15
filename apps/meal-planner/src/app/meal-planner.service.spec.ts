import { MealPlanner } from './meal-planner.service';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { recipeMother } from './testing/recipe.mother';

jest.useFakeTimers();

describe(MealPlanner.name, () => {
  it('should add a recipe to the meal plan', async () => {
    const { mealPlanner, getRecipes } = createMealPlanner();

    mealPlanner.addRecipe(recipeMother.withBasicInfo('Burger').build());

    expect(await getRecipes()).toEqual([
      expect.objectContaining({ name: 'Burger' }),
    ]);
  });

  it('should add createdAt to recipe', async () => {
    const { mealPlanner, getRecipes } = createMealPlanner();

    jest.setSystemTime(new Date('2021-01-01T00:00:00.000Z'));

    mealPlanner.addRecipe({ id: '3', name: 'Pizza', pictureUri: '...' });

    expect(await getRecipes()).toEqual([
      expect.objectContaining({ createdAt: '2021-01-01T00:00:00.000Z' }),
    ]);
  });

  it.todo('should not add same recipe twice');

  it.todo('should give the correct count of recipes');

  function createMealPlannerWithSomeRecipes() {
    const { mealPlanner, ...rest } = createMealPlanner();

    mealPlanner.addRecipe({ id: '1', name: 'Burger', pictureUri: '...' });
    mealPlanner.addRecipe({ id: '2', name: 'Pasta', pictureUri: '...' });

    return { mealPlanner, ...rest };
  }

  function createMealPlanner() {
    const mealPlanner = TestBed.inject(MealPlanner);

    return {
      mealPlanner,
      async getRecipes() {
        return await firstValueFrom(mealPlanner.recipes$);
      },
    };
  }
});
