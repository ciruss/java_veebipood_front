import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { environment } from '../../environments/environments';

import { Product } from '../models/product';
import { OrderRow } from '../models/orderRow';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  products: Product[] = [];

  private detectChange = inject(ChangeDetectorRef);

  ngOnInit() {
    fetch(`${backendUrl}/products`)
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
        this.detectChange.detectChanges();
      });
  }

  addToCart(product: Product) {
    const cart: OrderRow[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((cartItem: OrderRow) => cartItem.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
