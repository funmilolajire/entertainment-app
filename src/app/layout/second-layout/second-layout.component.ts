import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-second-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './second-layout.component.html',
  styleUrls: ['./second-layout.component.scss'],
})
export class SecondLayoutComponent {}
