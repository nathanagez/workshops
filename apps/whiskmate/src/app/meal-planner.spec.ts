import { MealPlanner } from './meal-planner';
import { createRecipe, Recipe } from './recipe';

describe(MealPlanner.name, () => {
  it('should add recipes', () => {
    const { mealPlanner } = setUp();

    const emptyRecipes = mealPlanner.getRecipes();

    mealPlanner.addRecipe(RecipeMother.withName('Burger').value);
    mealPlanner.addRecipe(RecipeMother.withName('Pizza').value);

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
    const { mealPlanner } = setUp();

    mealPlanner.addRecipe(RecipeMother.withName('Burger').value);

    expect(() =>
      mealPlanner.addRecipe(RecipeMother.withName('Burger').value)
    ).toThrow(new Error(`Duplicate recipe error.`));
  });

  it('should remove recipes', () => {
    const { mealPlanner } = setUpWithRecipes();

    mealPlanner.removeRecipe('burger');

    expect(mealPlanner.getRecipes()).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'burger' })])
    );
  });

  it('should move up recipes', () => {
    const { mealPlanner } = setUpWithRecipes();

    mealPlanner.moveUp('salad');

    expect(mealPlanner.getRecipes()).toEqual([
      expect.objectContaining({ id: 'burger' }),
      expect.objectContaining({ id: 'salad' }),
      expect.objectContaining({ id: 'pizza' }),
    ]);
  });

  it('should not change recipes on first recipe move up', () => {
    const { mealPlanner } = setUpWithRecipes();

    mealPlanner.moveUp('burger');

    expect(mealPlanner.getRecipes()).toEqual([
      expect.objectContaining({ id: 'burger' }),
      expect.objectContaining({ id: 'pizza' }),
      expect.objectContaining({ id: 'salad' }),
    ]);
  });

  function setUpWithRecipes() {
    const { mealPlanner } = setUp();
    mealPlanner.addRecipe(RecipeMother.withName('Burger').value);
    mealPlanner.addRecipe(RecipeMother.withName('Pizza').value);
    mealPlanner.addRecipe(RecipeMother.withName('Salad').value);
    return { mealPlanner };
  }

  function setUp() {
    return {
      mealPlanner: new MealPlanner(),
    };
  }
});

class RecipeMother {
  constructor(public value: Recipe) {}

  static withName(name: string) {
    return new RecipeMother(createRecipe({ id: name.toLowerCase(), name }));
  }
}
