import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecipeFilter } from './recipe-filter';
import { filter, Observable, Subscription } from 'rxjs';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-filter',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="searchForm">
      <input formControlName="keywords" placeholder="Keywords" type="text" />
      <input formControlName="minSteps" placeholder="Min steps" type="number" />
      <input formControlName="maxSteps" placeholder="Max steps" type="number" />
    </form>

    <div
      *ngIf="
        searchForm.get('keywords')?.touched &&
        searchForm.get('keywords')?.hasError('required')
      "
    >
      Keywords is required
    </div>
  `,
})
export class RecipeFilterComponent implements OnInit {
  @Output() filterChange: Observable<RecipeFilter>;

  keywordsCtrl = new FormControl<string | null>(null, {
    validators: [Validators.minLength(3)],
  });
  minStepsCtrl = new FormControl<number | null>(null);
  maxStepsCtrl = new FormControl<number | null>(null);
  searchForm = new FormGroup({
    keywords: this.keywordsCtrl,
    minSteps: this.minStepsCtrl,
    maxSteps: this.maxStepsCtrl,
  });

  private _sub = new Subscription();

  constructor() {
    this.filterChange = this.searchForm.valueChanges.pipe(
      filter(() => this.searchForm.valid)
    );
  }

  ngOnInit() {
    this._updateControls();

    this._sub.add(
      this.keywordsCtrl.valueChanges.subscribe(() => this._updateControls())
    );
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  /**
   * Enable/disable min/max steps based on keywords.
   */
  private _updateControls() {
    if (this.keywordsCtrl.valid) {
      this.minStepsCtrl.enable({ emitEvent: false });
      this.maxStepsCtrl.enable({ emitEvent: false });
    } else {
      this.minStepsCtrl.disable({ emitEvent: false });
      this.maxStepsCtrl.disable({ emitEvent: false });
    }
  }
}
