import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule, MatIconModule
  ],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment {

  booking: any;

  tickets: any[] = [];

  subtotal = 0;

  gst = 0;

  convenience = 499;

  total = 0;

  constructor() {

    const nav = history.state;

    this.booking = nav.booking;

    if (this.booking) {

      this.tickets = this.booking.tickets;

      this.subtotal =
        this.tickets.reduce(
          (sum, t) => sum + t.price,
          0
        );

      this.gst =
        this.subtotal * 0.18;

      this.total =
        this.subtotal +
        this.gst +
        this.convenience;

    }

  }

}