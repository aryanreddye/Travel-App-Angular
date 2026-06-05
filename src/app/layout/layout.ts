import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

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
        this.router.navigate(['/profile']);
        break;

      case 'signout':
        this.router.navigate(['/']);
        break;
    }

    if (sidenav && sidenav.close) {
      sidenav.close();
    }
  }
}