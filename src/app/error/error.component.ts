import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecondLayoutComponent } from '../layout/second-layout/second-layout.component';

@Component({
  standalone: true,
  imports: [CommonModule, SecondLayoutComponent],
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  errorType: 404 | 401 | 500 | number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.errorType = this.route.snapshot.data['type']
      ? Number(this.route.snapshot.data['type'])
      : null;
  }

  navigateAway() {
    if (this.errorType === 404 || this.errorType === 401) {
      this.errorType === 401
        ? this.router.navigateByUrl('/login')
        : this.errorType === 404
        ? this.location.back()
        : null;
    }
  }
}
