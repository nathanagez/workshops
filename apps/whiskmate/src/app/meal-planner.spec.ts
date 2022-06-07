import { MealPlanner } from './meal-planner';

describe(MealPlanner.name, () => {
  it('should add recipes', () => {
    const { mealPlanner, createBurger, createPizza } = setUp();

    const emptyRecipes = mealPlanner.getRecipes();
    expect(emptyRecipes).toEqual([]);

    mealPlanner.addRecipe(createBurger());
    mealPlanner.addRecipe(createPizza());

    expect(mealPlanner.getRecipes()).toEqual([
      {
        id: 'burger',
        name: 'Burger',
      },
      {
        id: 'pizza',
        name: 'Pizza',
      },
    ]);
  });

  it('should not allow duplicates', () => {
    const { mealPlanner, createBurger } = setUp();

    mealPlanner.addRecipe(createBurger());

    expect(() => mealPlanner.addRecipe(createBurger())).toThrow(
      new Error(`Duplicate recipe error.`)
    );
  });

  it('should remove recipes', () => {
    const { mealPlanner, createBurger, createPizza } = setUp();

    mealPlanner.addRecipe(createBurger());
    mealPlanner.addRecipe(createPizza());
    mealPlanner.removeRecipe('burger');

    expect(mealPlanner.getRecipes()).toEqual([
      {
        id: 'pizza',
        name: 'Pizza',
      },
    ]);
  });

  function setUp() {
    return {
      createBurger() {
        return { id: 'burger', name: 'Burger' };
      },
      createPizza() {
        return { id: 'pizza', name: 'Pizza' };
      },
      mealPlanner: new MealPlanner(),
    };
  }
});
