import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  user = {
    name: 'Aaryan Reddy',
    email: 'aaryan@example.com',
    phone: '+91 98765 43210',
    memberSince: 'January 2025',
    accountTier: 'Gold Member',
  };
}

