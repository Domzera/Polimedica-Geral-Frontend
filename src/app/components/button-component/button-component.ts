import { Component, EventEmitter, Output, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-button-component',
  styleUrl: './button-component.scss',
  templateUrl: './button-component.html',
})
export class ButtonComponent {
  readonly intext = input<string>('');
  @Output() onClick = new EventEmitter<void>();

  dispararClique() {
    this.onClick.emit();
  }

}
