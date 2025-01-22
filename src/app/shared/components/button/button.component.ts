import { NgClass } from '@angular/common';
import { booleanAttribute, Component, Input } from '@angular/core';

const CLASSES = {
  red: 'text-white w-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center',
  green:
    'text-white w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center',
};

type ButtonStyle = 'green' | 'red';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input({transform: booleanAttribute}) loading: boolean = false;
  @Input() text: string = 'Click me';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() buttonStyle: ButtonStyle = 'green';

  classStyle = CLASSES.green;

  constructor() {
    this.classStyle = CLASSES[this.buttonStyle];
  }

}
