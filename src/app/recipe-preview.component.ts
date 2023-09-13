import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recipe } from './recipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  template: `
      <h2><a [routerLink]="['/recipe', recipe.id]">{{ recipe.name }}</a></h2>
      <p>{{ recipe.description ?? '(no description)' }}</p>
      <ng-content/>
  `,
  styles: [
    `
      :host {
        display: block;
        border-radius: 5px;
        margin: 10px;
        padding: 10px;
        box-shadow: rgba(100, 100, 111, 0.2) 0 3px 5px 0;
      }

      p {
        font-style: italic;
      }
    `,
  ],
})
export class RecipePreviewComponent {
  @Input({ required: true }) recipe!: Recipe;
}
