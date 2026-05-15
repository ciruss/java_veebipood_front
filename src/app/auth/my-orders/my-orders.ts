import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { environment } from '../../../environments/environments';
import { Order } from '../../models/order';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-my-orders',
  imports: [],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders {
  orders: Order[] = [];

  private detectChange = inject(ChangeDetectorRef);

  constructor() {
    this.fetchOrders();
  }

  private fetchOrders() {
    fetch(`${backendUrl}/my-orders`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.orders = data;
        this.detectChange.detectChanges();
      });
  }

  ngOnInit() {
    this.fetchOrders();
  }
}
