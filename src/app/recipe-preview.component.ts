import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from './recipe';

@Component({
  selector: 'app-recipe-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>{{ recipe.name }}</h2>
    <p>{{ recipe.description ?? '(no description)' }}</p>
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
