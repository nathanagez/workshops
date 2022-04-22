import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NEVER, of, throwError } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeFilter } from './recipe-filter';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeSearchComponent } from './recipe-search.component';

describe(RecipeSearchComponent.name, () => {
  const burger = { id: 'burger', name: 'Burger' } as Recipe;
  const pizza = { id: 'pizza', name: 'Pizza' } as Recipe;

  describe('startup', () => {
    it('should display "Loading..."', async () => {
      const { mockRepo, render, isLoadingDisplayed } = createComponent();

      mockRepo.search.mockReturnValue(NEVER);

      render();

      expect(isLoadingDisplayed()).toBe(true);
    });

    it('should load recipes', () => {
      const { mockRepo, getDisplayedRecipes } = renderWithRecipes();

      expect(getDisplayedRecipes()).toEqual([
        expect.objectContaining({
          name: 'Burger',
        }),
        expect.objectContaining({
          name: 'Pizza',
        }),
      ]);

      expect(mockRepo.search).toBeCalledTimes(1);
      expect(mockRepo.search).toBeCalledWith(null);
    });

    it('should hide loading bar when recipes are loaded', () => {
      const { isLoadingDisplayed } = renderWithRecipes();
      expect(isLoadingDisplayed()).toBe(false);
    });
  });

  describe('filtering', () => {
    it('should search recipes on filter change', () => {
      const { mockRepo, render, getDisplayedRecipes, updateFilter } =
        createComponent();

      mockRepo.search.mockImplementation((filter) => {
        if (filter?.keywords === 'Burger') {
          return of([burger]);
        }

        return of([burger, pizza]);
      });

      render();

      updateFilter({ keywords: 'Burger' });

      expect(getDisplayedRecipes()).toEqual([
        expect.objectContaining({
          name: 'Burger',
        }),
      ]);

      expect(mockRepo.search).toBeCalledTimes(2);
      expect(mockRepo.search).nthCalledWith(2, { keywords: 'Burger' });
    });
  });

  describe('with error', () => {
    it('should show error message on error', () => {
      const { getDisplayedRecipes, isErrorDisplayed } = renderWithSearchError();

      expect(getDisplayedRecipes()).toEqual([]);
      expect(isErrorDisplayed()).toBe(true);
    });

    it('should hide loading message on error', () => {
      const { isLoadingDisplayed } = renderWithSearchError();

      expect(isLoadingDisplayed()).toBe(false);
    });

    it('should still work after error', () => {
      const { mockRepo, updateFilter } = renderWithSearchError();

      updateFilter(null);

      /* Make sure repo.search is called again when filter changes. */
      expect(mockRepo.search).toBeCalledTimes(2);
    });
  });

  function renderWithRecipes() {
    const { mockRepo, render, ...utils } = createComponent();

    mockRepo.search.mockReturnValue(of([burger, pizza]));

    render();

    return { mockRepo, ...utils };
  }

  function renderWithSearchError() {
    const { mockRepo, render, ...utils } = createComponent();

    mockRepo.search.mockReturnValue(throwError(() => new Error('💥')));

    render();

    return { mockRepo, ...utils };
  }

  function createComponent() {
    const mockRepo: jest.Mocked<Pick<RecipeRepository, 'search'>> = {
      search: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [RecipeSearchComponent],
      providers: [
        {
          provide: RecipeRepository,
          useValue: mockRepo,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    let fixture: ComponentFixture<RecipeSearchComponent>;

    return {
      mockRepo,
      render() {
        fixture = TestBed.createComponent(RecipeSearchComponent);
        fixture.detectChanges();
      },
      isErrorDisplayed() {
        return (
          fixture.debugElement.query(By.css('[data-role="error-message"]')) !=
          null
        );
      },
      isLoadingDisplayed() {
        return (
          fixture.debugElement.query(By.css('[data-role="loading-message"]')) !=
          null
        );
      },
      getDisplayedRecipes() {
        return fixture.debugElement
          .queryAll(By.css('wm-recipe-preview'))
          .map((el) => el.properties['recipe']);
      },
      updateFilter(filter: RecipeFilter | null) {
        fixture.debugElement
          .query(By.css('wm-recipe-filter'))
          .triggerEventHandler('filterChange', filter);
        fixture.detectChanges();
      },
    };
  }
});
