import { MealPlanner } from './meal-planner';
import { createRecipe } from './recipe';

describe(MealPlanner.name, () => {
  it('should add recipes', () => {
    const { mealPlanner, createBurger, createPizza } = setUp();

    const emptyRecipes = mealPlanner.getRecipes();

    mealPlanner.addRecipe(createBurger());
    mealPlanner.addRecipe(createPizza());

    expect(emptyRecipes).toEqual([]);
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
    const { mealPlanner } = setUpWithRecipes();

    mealPlanner.removeRecipe('burger');

    expect(mealPlanner.getRecipes()).toEqual([
      {
        id: 'pizza',
        name: 'Pizza',
      },
    ]);
  });

  xit('should move up recipes', () => {
    const { mealPlanner } = setUpWithRecipes();

    mealPlanner.moveUp('pizza');

    expect(mealPlanner.getRecipes()).toEqual([
      expect.objectContaining({ id: 'pizza' }),
      expect.objectContaining({ id: 'burger' }),
    ]);
  });

  xit('should not change recipes on first recipe move up', () => {
    const { mealPlanner } = setUpWithRecipes();

    mealPlanner.moveUp('burger');

    expect(mealPlanner.getRecipes()).toEqual([
      expect.objectContaining({ id: 'burger' }),
      expect.objectContaining({ id: 'pizza' }),
    ]);
  });

  function setUpWithRecipes() {
    const { mealPlanner, createBurger, createPizza } = setUp();
    mealPlanner.addRecipe(createBurger());
    mealPlanner.addRecipe(createPizza());
    return { mealPlanner };
  }

  function setUp() {
    return {
      createBurger() {
        return createRecipe({ id: 'burger', name: 'Burger' });
      },
      createPizza() {
        return createRecipe({ id: 'pizza', name: 'Pizza' });
      },
      mealPlanner: new MealPlanner(),
    };
  }
});
