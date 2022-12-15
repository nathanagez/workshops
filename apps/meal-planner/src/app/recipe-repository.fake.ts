import { Observable, of } from 'rxjs';
import { Recipe } from './recipe';
import { recipeMother } from './testing/recipe.mother';

export class RecipeRepositoryFake {
  private _recipes: Recipe[] = [
    recipeMother.withBasicInfo('Burger').build(),
    recipeMother.withBasicInfo('Pizza').build(),
  ];

  getRecipes({ keywords }: { keywords?: string | null } = {}): Observable<
    Recipe[]
  > {
    const recipes =
      keywords == null
        ? this._recipes
        : this._recipes.filter((recipe) => recipe.name.includes(keywords));
    return of(recipes);
  }

  setLotsOfRecipes(count: number) {
    let i = 0;
    const recipes = Array.from(Array(count)).map(() =>
      recipeMother.withBasicInfo(`Burger ${i++}`).build()
    );
    this._recipes = recipes;
  }
}
