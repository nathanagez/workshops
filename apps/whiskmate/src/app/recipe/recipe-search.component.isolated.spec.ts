import { TestBed } from '@angular/core/testing';
import { Observable, of, NEVER, Subject } from 'rxjs';
import { delay, finalize, first } from 'rxjs/operators';
import { createObserver } from '../../testing/observer';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeSearchComponent } from './recipe-search.component';

jest.useFakeTimers('modern');

describe(RecipeSearchComponent.name, () => {
  const papperdelle = { id: 'papperdelle-with-rose-harissa' } as Recipe;
  const puyLentil = { id: 'puy-lentil-and-aubergine-stew' } as Recipe;
  const { observe } = createObserver();

  it('should stop fetching data on filter change', () => {
    const { component, mockRepo } = createComponent();
    const finalizeSpy = jest.fn();

    mockRepo.search
      .mockReturnValueOnce(
        /* Detect unsubscription. */
        new Subject<Recipe[]>().pipe(finalize(finalizeSpy))
      )
      .mockReturnValueOnce(NEVER);

    /* Subscribe to items$ just like the view would do.
     * This implicitly triggers the first search. */
    observe(component.items$);

    /* Trigger a filter change. */
    component.onFilterChange({});

    expect(finalizeSpy).toBeCalledTimes(1);
  });

  it('should use result for last filter even if previous call is slower', () => {
    const { component, mockRepo } = createComponent();

    mockRepo.search
      /* First call responds after 1s. */
      .mockReturnValueOnce(of([papperdelle, puyLentil]).pipe(delay(1000)))
      /* Second call is instant. */
      .mockReturnValueOnce(of([puyLentil]));

    /* Subscribe to items$ just like the view would do.
     * This implicitly triggers the first search. */
    const spy = observe(component.items$);

    /* Trigger a filter change. */
    component.onFilterChange({});

    /* Trigger the response of the first call to repo.search. */
    jest.runAllTimers();

    expect(spy.next).toBeCalledTimes(1);
  });

  it('should search recipes without keyword on load', async () => {
    const { component, mockRepo } = createComponent();

    mockRepo.search.mockReturnValueOnce(of([papperdelle, puyLentil]));

    expect(await firstValueFrom(component.items$)).toEqual([
      expect.objectContaining({ recipe: papperdelle }),
      expect.objectContaining({ recipe: puyLentil }),
    ]);

    expect(mockRepo.search).toBeCalledTimes(1);
    expect(mockRepo.search).toBeCalledWith({});
  });

  function createComponent() {
    const mockRepo = { search: jest.fn() } as jest.Mocked<
      Pick<RecipeRepository, 'search'>
    >;

    TestBed.configureTestingModule({
      providers: [
        RecipeSearchComponent,
        {
          provide: RecipeRepository,
          useValue: mockRepo,
        },
      ],
    });

    return { component: TestBed.inject(RecipeSearchComponent), mockRepo };
  }
});

async function firstValueFrom<T>(source: Observable<T>): Promise<T> {
  return source.pipe(first()).toPromise();
}
