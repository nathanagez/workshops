import { RecipeSearchComponent } from './recipe-search.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeRepositoryFake } from './recipe-repository.fake';

describe(RecipeSearchComponent.name, () => {
  it('should disable add button when added', () => {
    const fake = new RecipeRepositoryFake();
    fake.setLotsOfRecipes(200);

    cy.mount(RecipeSearchComponent, {
      imports: [HttpClientModule],
      providers: [
        {
          provide: RecipeRepository,
          useValue: fake,
        },
      ],
    });

    cy.get('button').contains('ADD').first().click();

    cy.get('button').contains('ADD').first().should('be.disabled');
  });
});
