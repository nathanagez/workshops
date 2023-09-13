import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRepository } from './recipe-repository.service';
import { EMPTY } from 'rxjs';
import { RecipePreviewComponent } from './recipe-preview.component';
import { rxComputed } from '@jscutlery/rx-computed';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RecipePreviewComponent],
  template: `
    <app-recipe-preview *ngIf="recipe() as recipeValue" [recipe]="recipeValue"/>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent {
  @Input({ required: true }) set recipeId(recipeId: string) {
    this._recipeId.set(recipeId);
  }

  recipe = rxComputed(() => {
    const recipeId = this._recipeId();
    return recipeId ? this._repo.getRecipe(recipeId) : EMPTY;
  });

  private _recipeId = signal<string | null>(null);
  private _repo = inject(RecipeRepository);
}

export default RecipeDetailComponent;
