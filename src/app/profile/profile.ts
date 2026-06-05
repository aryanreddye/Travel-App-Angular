import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  user: any;

  constructor(private userService: UserService) {
    this.user = this.userService.getUserData();
  }
}

