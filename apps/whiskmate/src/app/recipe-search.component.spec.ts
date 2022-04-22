import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NEVER, of } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeSearchComponent } from './recipe-search.component';

describe(RecipeSearchComponent.name, () => {
  it('should display "Loading..."', async () => {
    const { mockRepo, render, isLoadingDisplayed } = createComponent();

    mockRepo.search.mockReturnValue(NEVER);

    render();

    expect(isLoadingDisplayed()).toBe(true);
  });

  it('should load recipes on startup', () => {
    const { mockRepo, render, getDisplayedRecipes } = createComponent();
    const burger = { id: 'burger', name: 'Burger' } as Recipe;
    const pizza = { id: 'pizza', name: 'Pizza' } as Recipe;

    mockRepo.search.mockReturnValue(of([burger, pizza]));

    render();

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

  xit('🚧 should search recipes on filter change', () => {
    // fixture.query(By.css('wm-recipe-filter')).triggerEventHandler('filterChange', {});
    // fixture.detectChanges();
  });

  it.todo('🚧 should show error message on error');

  it.todo('🚧 should still work after error');

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
    };
  }
});
