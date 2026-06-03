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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
    MatRadioModule,
    MatSnackBarModule
  ],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  selectedType = 'flights';
  fromPlace = '';
  toPlace = '';
  hotelPlace = '';
  hotelName = '';
  hotelImage = '';

  hasSearched = false;

  flightResults: { airline: string; from: string; to: string; depart: string; price: number; image: string }[] = [];
  hotelResults: { name: string; location: string; price: number; image?: string }[] = [];
  trainResults: { name: string; from: string; to: string; depart: string; price: number; image: string }[] = [];

  hotels: { name: string; location: string; price: number; image?: string }[] = [
    { name: 'Reddylton Palace', location: 'Dubai', price: 28999, image: 'images/hotel.webp' },
    { name: 'Dubai Sky Resort', location: 'Dubai', price: 28999, image: 'images/dubai_resort.webp' },
    { name: 'Desert Oasis Resort', location: 'Dubai', price: 19999, image: 'images/hotel.webp' },
    { name: 'Seaside Retreat', location: 'Goa', price: 8999, image: 'images/goa.jpg' },
    { name: 'Sunset Bay', location: 'Goa', price: 10999, image: 'images/goa.jpg' },
    { name: 'Goa Beach Retreat', location: 'Goa', price: 11999, image: 'images/goa.jpg' },
    { name: 'Parisian Suites', location: 'Paris', price: 45999, image: 'images/paris.jpg' },
    { name: 'Parisian Suite', location: 'Paris', price: 44999, image: 'images/paris.jpg' },
    { name: 'Shinjuku Inn', location: 'Tokyo', price: 32999, image: 'images/tokyo.jpg' },
    { name: 'Tokyo Comfort Stay', location: 'Tokyo', price: 32999, image: 'images/tokyo.jpg' },
    { name: 'Bali Beach Villas', location: 'Bali', price: 23999, image: 'images/bali_resort.png' },
    { name: 'Bali Villa Stay', location: 'Bali', price: 23999, image: 'images/bali.jpg' },
    { name: 'Bali Water Villa', location: 'Bali', price: 79999, image: 'images/bali.jpg' }
  ];

  flights: { airline: string; from: string; to: string; depart: string; price: number; image: string }[] = [
    { airline: 'ReddyFisher Airways', from: 'Hyderabad', to: 'Dubai', depart: '2026-06-08', price: 45000, image: 'images/flight.jpg' },
    { airline: 'ReddyFisher Airways', from: 'Mumbai', to: 'Paris', depart: '2026-06-10', price: 52000, image: 'images/indigo.jpg' },
    { airline: 'ReddyFisher Airways', from: 'Delhi', to: 'Tokyo', depart: '2026-06-12', price: 59000, image: 'images/spice.webp' },
    { airline: 'ReddyFisher Airways', from: 'Chennai', to: 'Goa', depart: '2026-06-15', price: 28000, image: 'images/flight.jpg' }
  ];

  trains: { name: string; from: string; to: string; depart: string; price: number; image: string }[] = [
    { name: 'Vande Bharat Express', from: 'Hyderabad', to: 'Chennai', depart: '2026-06-09', price: 2200, image: 'images/trains.webp' },
    { name: 'Shatabdi Express', from: 'Delhi', to: 'Mumbai', depart: '2026-06-11', price: 2500, image: 'images/trains.webp' },
    { name: 'Tejas Express', from: 'Mumbai', to: 'Hyderabad', depart: '2026-06-13', price: 2400, image: 'images/trains.webp' }
  ];

  startDate: any = '';
  endDate: any = '';

  ticketCount = 1;

  passengers: { type: 'adult' | 'child' }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const type = this.route.snapshot.paramMap.get('type');
    if (type) this.selectedType = type;

    const queryParams = this.route.snapshot.queryParamMap;
    const location = queryParams.get('location');
    const hotelName = queryParams.get('hotelName');
    const hotelImage = queryParams.get('hotelImage');
    const to = queryParams.get('to');
    const from = queryParams.get('from');

    if (location) {
      this.hotelPlace = location;
      this.toPlace = location;
    }

    if (hotelName) {
      this.hotelName = hotelName;
    }

    if (hotelImage) {
      this.hotelImage = hotelImage;
    }

    if (to) {
      this.toPlace = to;
    }

    if (from) {
      this.fromPlace = from;
    }

    this.updatePassengers(this.ticketCount);
  }

  get filteredHotels() {
    let result = this.hotels;

    if (this.hotelPlace) {
      result = result.filter(h => h.location === this.hotelPlace);
    }

    if (this.hotelName) {
      result = result.filter(h => h.name === this.hotelName);
    }

    return result;
  }

  get filteredFlights() {
    let result = this.flights;

    if (this.fromPlace) {
      result = result.filter(f => f.from === this.fromPlace);
    }

    if (this.toPlace) {
      result = result.filter(f => f.to === this.toPlace);
    }

    return result;
  }

  get filteredTrains() {
    let result = this.trains;

    if (this.fromPlace) {
      result = result.filter(t => t.from === this.fromPlace);
    }

    if (this.toPlace) {
      result = result.filter(t => t.to === this.toPlace);
    }

    return result;
  }

  updatePassengers(count: number) {
    const updated: { type: 'adult' | 'child' }[] = [];

    for (let i = 0; i < count; i++) {
      updated[i] = this.passengers[i] || { type: 'adult' };
    }

    this.passengers = updated;
  }


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

  onSearch() {
    this.hasSearched = true;

    if (this.selectedType === 'flights') {
      if (!this.fromPlace || !this.toPlace || !this.startDate || this.ticketCount < 1) {
        this.snackBar.open('Complete all flight search fields before searching.', 'Close', { duration: 2000 });
        return;
      }

      this.flightResults = this.filteredFlights;
      this.hotelResults = [];
      this.trainResults = [];
      return;
    }

    if (this.selectedType === 'hotels') {
      if (!this.hotelPlace || !this.startDate || !this.endDate || this.ticketCount < 1) {
        this.snackBar.open('Complete all hotel search fields before searching.', 'Close', { duration: 2000 });
        return;
      }

      this.hotelResults = this.filteredHotels;
      this.flightResults = [];
      this.trainResults = [];
      return;
    }

    if (this.selectedType === 'trains') {
      if (!this.fromPlace || !this.toPlace || !this.startDate || this.ticketCount < 1) {
        this.snackBar.open('Complete all train search fields before searching.', 'Close', { duration: 2000 });
        return;
      }

      this.trainResults = this.filteredTrains;
      this.flightResults = [];
      this.hotelResults = [];
    }
  }

  goToPayment(type: string, title: string, basePrice: number) {

    const tickets: any[] = [];

    for (let i = 0; i < this.ticketCount; i++) {
      tickets.push({
        passenger: `Passenger ${i + 1}`,
        category: this.passengers[i].type === 'child' ? 'Child' : 'Adult',
        seat: `${String.fromCharCode(65 + i)}${10 + i}`,
        price: this.passengers[i].type === 'child' ? basePrice * 0.5 : basePrice,
        name: '',
        age: null
      });
    }

    const total = tickets.reduce((sum, t) => sum + t.price, 0);

    const bookingState = {
      type,
      title,
      name: title,
      from: this.fromPlace,
      to: this.toPlace,
      hotelPlace: this.hotelPlace,
      startDate: this.startDate,
      endDate: this.endDate,
      tickets,
      total
    };

    this.router.navigate(['/payment'], {
      state: {
        booking: bookingState
      }
    });
  }
}