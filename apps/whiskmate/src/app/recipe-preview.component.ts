import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recipe } from './recipe';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-preview',
  imports: [CommonModule],
  template: `
    <span>{{ recipe?.name }}</span>
    <div class="actions">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin: 10px;
        min-height: 60px;
        padding: 10px;
      }

      .actions {
        display: flex;
        gap: 10px;
        opacity: 0.5;
      }

      :host:hover .actions {
        opacity: 1;
      }
    `,
  ],
})
export class RecipePreviewComponent {
  @Input() recipe?: Recipe;
}
