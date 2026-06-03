import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: any[] = [];

  getOrders(): any[] {
    return this.orders;
  }

  addOrder(order: any): void {
    this.orders.push(order);
  }

  clearOrders(): void {
    this.orders = [];
  }
}
