import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    NgIf,
    NgForOf,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
        <mat-sidenav-container class="sidenav-container">
            <mat-sidenav
                    #drawer
                    class="sidenav"
                    fixedInViewport
                    [attr.role]="isHandset() ? 'dialog' : 'navigation'"
                    [mode]="isHandset() ? 'over' : 'side'"
                    [opened]="isHandset() === false"
            >
                <mat-toolbar>Menu</mat-toolbar>
                <mat-nav-list>
                    <a *ngFor="let link of links"
                       #linkActive="routerLinkActive"
                       [activated]="linkActive.isActive"
                       [routerLink]="link.route"
                       routerLinkActive
                       mat-list-item>{{link.label}}</a>
                </mat-nav-list>
            </mat-sidenav>
            <mat-sidenav-content>
                <mat-toolbar color="primary">
                    <button
                            type="button"
                            aria-label="Toggle sidenav"
                            mat-icon-button
                            (click)="drawer.toggle()"
                            *ngIf="isHandset()"
                    >
                        <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
                    </button>
                    <span>whiskmate</span>
                </mat-toolbar>
                <ng-content/>
            </mat-sidenav-content>
        </mat-sidenav-container>
    `,
  styles: [
    `
      .sidenav-container {
        height: 100%;
      }

      .sidenav {
        width: 200px;
      }

      .sidenav .mat-toolbar {
        background: inherit;
      }

      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 1;
      }
    `,
  ],
})
export class LayoutComponent {
  @Input() links: Link[] = [];

  isHandset = toSignal(
    inject(BreakpointObserver)
      .observe(Breakpoints.Handset)
      .pipe(map((result) => result.matches))
  );
}

export interface Link {
  route: string[];
  label: string;
}
