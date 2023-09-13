import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecipeSearchComponent } from './recipe-search.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RecipeSearchComponent],
  template: `
        <app-recipe-search/>
    `,
})
export class AppComponent {}
