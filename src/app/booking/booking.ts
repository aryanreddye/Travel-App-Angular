import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule, FormsModule
  ],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})

export class Booking {

  bookingType = '';

  passengerName = '';

  totalPrice = 1200;

  ticketCount = 1;

  selectedDate: any = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {

    this.bookingType =
      this.route.snapshot.paramMap.get('type') || '';

  }

  confirmBooking() {

    // PRICE CALCULATION

    if (this.bookingType === 'flights') {
      this.totalPrice = this.ticketCount * 4500;
    }

    if (this.bookingType === 'trains') {
      this.totalPrice = this.ticketCount * 800;
    }

    if (this.bookingType === 'hotels') {
      this.totalPrice = this.ticketCount * 2500;
    }

    // CREATE ORDER OBJECT

    const order = {

      type: this.bookingType,

      name: this.passengerName,

      tickets: this.ticketCount,

      date: this.selectedDate,

      price: this.totalPrice

    };

    // SUCCESS MESSAGE

    this.snackBar.open(
      'Booking Successful 🎉',
      'Close',
      {
        duration: 2000
      }
    );

    // NAVIGATE TO DASHBOARD

    this.router.navigate(
      ['/dashboard'],
      {
        state: { order }
      }
    );

  }

}
    