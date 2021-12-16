import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NEVER, Observable, of } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';
import {
  RecipeSearchComponent,
  RecipeSearchModule,
} from './recipe-search.component';

describe(RecipeSearchComponent.name, () => {
  const papperdelle = {
    id: 'papperdelle-with-rose-harissa',
    name: 'Pappardelle with rose harissa, black olives and capers',
  } as Recipe;
  const puyLentil = {
    id: 'puy-lentil-and-aubergine-stew',
    name: 'Puy lentil and aubergine stew',
  } as Recipe;

  it('should show loading bar', async () => {
    const { getRecipeNames, isLoading } = await createComponent({
      searchResult: NEVER,
    });

    expect(isLoading()).toBe(true);
    expect(getRecipeNames()).toEqual([]);
  });

  it('should hide loading bar on result', async () => {
    const { isLoading } = await createComponent();

    expect(isLoading()).toBe(false);
  });

  it('should search recipes without keyword on load', async () => {
    const { getRecipeNames } = await createComponent();

    expect(getRecipeNames()).toEqual([
      expect.stringMatching(/^Pappardelle/),
      expect.stringMatching(/^Puy/),
    ]);
  });

  async function createComponent({
    searchResult,
  }: { searchResult?: Observable<Recipe[]> } = {}) {
    const mockRepo = { search: jest.fn() } as jest.Mocked<
      Pick<RecipeRepository, 'search'>
    >;

    mockRepo.search.mockReturnValue(
      searchResult ?? of([papperdelle, puyLentil])
    );

    await TestBed.configureTestingModule({
      imports: [RecipeSearchModule],
      providers: [
        {
          provide: RecipeRepository,
          useValue: mockRepo,
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(RecipeSearchComponent);

    fixture.detectChanges();

    return {
      component: fixture.componentInstance,
      fixture,
      mockRepo,
      isLoading() {
        return (
          fixture.debugElement.query(By.css('[data-role="loading"]')) != null
        );
      },
      getRecipeNames() {
        const elementList = fixture.debugElement.queryAll(
          By.css('[data-role="recipe-name"]')
        );
        return elementList.map((element) => element.nativeElement.textContent);
      },
    };
  }
});
