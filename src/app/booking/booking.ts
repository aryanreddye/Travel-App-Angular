import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule
  ],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {

  // ================= TYPE =================
  selectedType = 'flights';

  // ================= DATA =================
  fromPlace = '';
  toPlace = '';
  hotelPlace = '';

  startDate: any = '';
  endDate: any = '';

  ticketCount = 1;

  // 🔥 FIX: use object (NOT string array confusion)
  passengers: { type: 'adult' | 'child' }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // ================= INIT =================
  ngOnInit() {
    const type = this.route.snapshot.paramMap.get('type');
    if (type) this.selectedType = type;

    this.updatePassengers(this.ticketCount);
  }

  // ================= FIX PASSENGERS (MAIN BUG FIX) =================
  updatePassengers(count: number) {
    const updated: { type: 'adult' | 'child' }[] = [];

    for (let i = 0; i < count; i++) {
      updated[i] = this.passengers[i] || { type: 'adult' };
    }

    this.passengers = updated;
  }

  // ================= PRICE =================
  calculateFlightPrice() {
    return this.passengers.reduce((total, p) => {
      return total + (p.type === 'child' ? 25000 : 45000);
    }, 0);
  }

  calculateHotelPrice() {
    return this.passengers.reduce((total, p) => {
      return total + (p.type === 'child' ? 15000 : 28999);
    }, 0);
  }

  calculateTrainPrice() {
    return this.passengers.reduce((total, p) => {
      return total + (p.type === 'child' ? 1200 : 2200);
    }, 0);
  }

  // ================= BOOK =================
  confirmBooking(type: string, name: string, basePrice: number) {

    const tickets = [];

    for (let i = 0; i < this.ticketCount; i++) {

      tickets.push({
        passenger: `Passenger ${i + 1}`,
        category: this.passengers[i].type === 'child' ? 'Child' : 'Adult',
        seat: `${String.fromCharCode(65 + i)}${10 + i}`,
        price: this.passengers[i].type === 'child'
          ? basePrice * 0.5
          : basePrice
      });

    }

    const total = tickets.reduce((sum, t) => sum + t.price, 0);

    this.snackBar.open('Booking Successful 🎉', 'Close', {
      duration: 2000
    });

    this.router.navigate(['/payment'], {
      state: {
        booking: {
          type,
          name,
          from: this.fromPlace,
          to: this.toPlace,
          hotelPlace: this.hotelPlace,
          startDate: this.startDate,
          endDate: this.endDate,
          tickets,
          total
        }
      }
    });
  }
}