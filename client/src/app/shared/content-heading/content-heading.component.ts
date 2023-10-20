import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-heading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-heading.component.html',
  styleUrls: ['./content-heading.component.scss'],
})
export class ContentHeadingComponent {
  @Input({ required: true }) heading = '';
}
