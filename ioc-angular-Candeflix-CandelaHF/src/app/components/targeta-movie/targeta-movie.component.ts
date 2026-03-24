import { Component, Input } from '@angular/core';
import { Movie } from '../../models/element.model';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-targeta-movie',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './targeta-movie.component.html',
  styleUrl: './targeta-movie.component.scss'
})
export class TargetaMovieComponent {
  @Input() movie?: Movie;
}
