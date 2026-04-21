import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barra-cerca',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './barra-cerca.component.html',
  styleUrl: './barra-cerca.component.scss'
})
export class BarraCercaComponent {
  public textCercar!: string;
  @Output() textCercarEvent = new EventEmitter<string>();

  cercarClick(): void {
    this.textCercarEvent.emit(this.textCercar || '');
  }
}
