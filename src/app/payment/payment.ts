import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    RouterModule
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

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private orderService: OrderService
  ) {

    const nav = history.state;

    this.booking = nav.booking;

    if (this.booking) {
      this.tickets = this.booking.tickets.map((ticket: any) => ({
        ...ticket,
        name: ticket.name || '',
        age: ticket.age || null
      }));

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

  canConfirm(): boolean {
    return this.tickets.length > 0 && this.tickets.every(t => t.name?.trim() && t.age > 0);
  }

  confirmBooking(): void {
    if (!this.canConfirm()) {
      this.snackBar.open('Enter name and age for every passenger.', 'Close', { duration: 2000 });
      return;
    }

    const order = {
      type: this.booking?.type,
      name: this.tickets[0]?.name || 'Guest',
      from: this.booking?.from,
      to: this.booking?.to,
      hotelPlace: this.booking?.hotelPlace,
      startDate: this.booking?.startDate,
      endDate: this.booking?.endDate,
      tickets: this.tickets.length,
      total: this.total
    };

    this.orderService.addOrder(order);
    this.snackBar.open('Booking confirmed and added to orders.', 'Close', { duration: 2000 });
    this.router.navigate(['/dashboard']);
  }

}