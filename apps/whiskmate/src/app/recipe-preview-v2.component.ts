import { Recipe } from './recipe';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { CardModule } from './card.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-preview-v2',
  template: ` <wm-card *ngIf="recipe" [pictureUri]="recipe?.pictureUri">
    <h2 data-role="recipe-name">{{ recipe.name }}</h2>
    <ng-content></ng-content>
  </wm-card>`,
  styles: [
    `
      h2 {
        font-size: 1.2em;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ],
})
export class RecipePreviewV2Component {
  @Input() recipe?: Recipe;
}

@NgModule({
  declarations: [RecipePreviewV2Component],
  exports: [RecipePreviewV2Component],
  imports: [CommonModule, CardModule],
})
export class RecipePreviewV2Module {}
