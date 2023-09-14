import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { rxComputed } from '@jscutlery/rx-computed';
import { EMPTY, map } from 'rxjs';

@Component({
  selector: 'app-form-errors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  template: `
    <li *ngFor="let error of formErrors()" class="error">{{ error }}</li>
  `,
  styles: [
    `
      .error {
        font-size: small;
        color: red;
      }
    `,
  ],
})
export class FormErrorsComponent {
  @Input({ required: true }) set form(form: FormGroup) {
    this._form.set(form);
  }

  @Input() set controlNames(controlNames: Record<string, string>) {
    this._controlNames.set(controlNames);
  }

  formErrors = computed(() => {
    const errors = Object.entries(this._controls() ?? {})
      .map(([controlKey, control]) => {
        return Object.entries(control.errors ?? {}).map(
          ([errorId, errorInfo]) => {
            return {
              controlName: this._controlNames()[controlKey] ?? controlKey,
              errorId,
              errorInfo,
            };
          }
        );
      })
      .flat();

    return errors.map(({ controlName, errorId, errorInfo }) => {
      switch (errorId) {
        case 'required':
          return `${controlName} is required.`;
        case 'min':
          return `${controlName} min value is ${errorInfo['min']}.`;
        default:
          return `${controlName} is invalid.`;
      }
    });
  });

  private _form = signal<FormGroup | null>(null);

  /* @hack watch valueChanges to re-trigger change detection. */
  private _controls = rxComputed(
    () =>
      this._form()?.valueChanges.pipe(map(() => this._form()?.controls)) ??
      EMPTY
  );
  private _controlNames = signal<Record<string, string>>({});
}
