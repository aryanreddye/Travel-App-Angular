import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
})
export class Orders {
  orders: any[] = [];

  constructor(private orderService: OrderService) {
    this.orders = this.orderService.getOrders();
  }
}
