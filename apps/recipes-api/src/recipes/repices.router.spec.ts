import { recipesRouter } from './recipes.router';
import { createTestingClient } from '../testing/create-testing-client';
import { register } from '../di';
import {RecipesRepositoryFake} from "./recipes.repository.fake";
import {RECIPES_REPOSITORY_TOKEN} from "./recipes.repository";

describe(recipesRouter.name, () => {
  it('should say hi', async () => {
    const { client } = setUp();

    const response = await client.get('/recipes');

    expect(response.statusCode).toBe(200);
    expect(response.body.items).toContainEqual(
      expect.objectContaining({
        "id": "rec_1",
        "name": "Creamy Tomato Basil Pasta",
        "description": "A simple and delicious pasta dish with a creamy tomato basil sauce.",
        "pictureUrl": "https://dishingouthealth.com/wp-content/uploads/2022/09/CreamyTomatoPasta_Square.jpg",
        "steps": [
          "Cook the pasta according to package directions.",
          "While the pasta is cooking, heat the olive oil in a large skillet over medium heat.",
          "Add the garlic and cook until fragrant, about 30 seconds.",
          "Add the diced tomatoes, tomato paste, and basil. Bring to a simmer and cook for 10 minutes.",
          "Stir in the heavy cream and season with salt and pepper to taste.",
          "Drain the pasta and add it to the skillet with the sauce. Toss to coat.",
          "Serve immediately with grated Parmesan cheese."
        ],
        "ingredients": [
          "1 pound pasta",
          "1/4 cup olive oil",
          "3 cloves garlic, minced",
          "1 (14.5-ounce) can diced tomatoes, undrained",
          "2 tablespoons tomato paste",
          "1/2 cup fresh basil, chopped",
          "1/2 cup heavy cream",
          "Salt and pepper to taste"
        ]
      })
    );
  });

  it('Filter request should return the searched item', async () => {
    const { client } = setUp();

    const response = await client.get('/recipes?filter=Basil Pasta');

    expect(response.statusCode).toBe(200);
    expect(response.body.items).toContainEqual(
      expect.objectContaining({
        "id": "rec_1",
        "name": "Creamy Tomato Basil Pasta",
        "description": "A simple and delicious pasta dish with a creamy tomato basil sauce.",
        "pictureUrl": "https://dishingouthealth.com/wp-content/uploads/2022/09/CreamyTomatoPasta_Square.jpg",
        "steps": [
          "Cook the pasta according to package directions.",
          "While the pasta is cooking, heat the olive oil in a large skillet over medium heat.",
          "Add the garlic and cook until fragrant, about 30 seconds.",
          "Add the diced tomatoes, tomato paste, and basil. Bring to a simmer and cook for 10 minutes.",
          "Stir in the heavy cream and season with salt and pepper to taste.",
          "Drain the pasta and add it to the skillet with the sauce. Toss to coat.",
          "Serve immediately with grated Parmesan cheese."
        ],
        "ingredients": [
          "1 pound pasta",
          "1/4 cup olive oil",
          "3 cloves garlic, minced",
          "1 (14.5-ounce) can diced tomatoes, undrained",
          "2 tablespoons tomato paste",
          "1/2 cup fresh basil, chopped",
          "1/2 cup heavy cream",
          "Salt and pepper to taste"
        ]
      })
    );
  });

  it('Nothing found using filter parameter should return an empty array', async () => {
    const { client } = setUp();

    const response = await client.get('/recipes?filter=DAJIDjadiaj');

    expect(response.statusCode).toBe(200);
    expect(response.body.items).toEqual([]);
  });
});

function setUp() {
  const fakeRepo = new RecipesRepositoryFake();
  register(RECIPES_REPOSITORY_TOKEN, { useValue: fakeRepo });
  return createTestingClient(recipesRouter);
}
