import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-button-component',
  styleUrl: './button-component.scss',
  templateUrl: './button-component.html',
})
export class ButtonComponent {
@Input() intext: string = '';
}
