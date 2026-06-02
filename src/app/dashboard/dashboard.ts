import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {

  constructor(private router: Router) {}

  openSidebarOption(option: string, sidenav: any) {
    switch (option) {
      case 'profile':
        this.router.navigate(['/profile']);
        break;
      case 'orders':
        this.router.navigate(['/orders']);
        break;
      case 'settings':
        this.router.navigate(['/profile'], { queryParams: { section: 'settings' } });
        break;
      case 'signout':
        this.router.navigate(['/']);
        break;
      default:
        break;
    }

    if (sidenav && sidenav.close) {
      sidenav.close();
    }
  }

  openPage(type: string, params: any = {}) {
    this.router.navigate(['/booking', type], { queryParams: params });
  }

  openTopCard(type: string) {
    this.openPage(type);
  }

  openDestination(location: string) {
    this.openPage('hotels', { location });
  }

  openBooking(location: string) {
    this.openPage('hotels', { location });
  }

  openDealHotel(hotelName: string, location: string, image: string) {
    this.openPage('hotels', { hotelName, location, hotelImage: image });
  }

}