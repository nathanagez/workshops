import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'carousel',
    loadComponent: () => import('./recipe-carousel.component'),
  },
  {
    path: 'search',
    loadComponent: () => import('./recipe-search.component'),
  },
  {
    path: 'recipe/:recipeId',
    loadComponent: () => import('./recipe-detail.component'),
  },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.routes'),
  // },
  {
    path: '**',
    redirectTo: 'search',
  },
];