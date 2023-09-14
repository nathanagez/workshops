import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recipe } from '../recipe-domain/recipe';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-recipe-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, MatCardModule, NgOptimizedImage, NgIf],
  template: `
      <a class="container" [routerLink]="['/recipe', recipe.id]">
          <mat-card>
              <mat-card-header>
                  <mat-card-title>{{recipe.name}}</mat-card-title>
              </mat-card-header>
              <div class="img-container">
                  <img mat-card-image
                       *ngIf="recipe.pictureUri as pictureUri"
                       [alt]="recipe.name"
                       [ngSrc]="pictureUri"
                       [priority]="true"
                       fill>
              </div>
              <mat-card-content>
                  <p>{{ recipe.description ?? '(no description)' }}</p>
              </mat-card-content>
              <!-- Prevent event propagation so it doesn't trigger navigation. -->
              <mat-card-actions (click)="$event.preventDefault(); $event.stopPropagation()" class="actions">
                  <ng-content/>
              </mat-card-actions>
          </mat-card>
      </a>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        width: 400px;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .img-container {
        position: relative;
        height: 300px;
      }

      img {
        object-fit: cover;
      }

      p {
        font-style: italic;
      }

      .actions {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class RecipePreviewComponent {
  @Input({ required: true }) recipe!: Recipe;
}
