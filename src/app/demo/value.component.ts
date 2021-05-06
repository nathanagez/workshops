import { Component, Input, OnInit } from '@angular/core';
import { Color } from './color';

@Component({
  selector: 'mc-value',
  template: ` <p
    *ngIf="value != null"
    [style.color]="color"
    [style.fontSize.px]="value * 5 + 10"
  >
    {{ value }}
  </p>`,
})
export class ValueComponent {
  @Input() color: Color | null = null;
  @Input() value: number | null = null;
}
