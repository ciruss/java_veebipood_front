import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { environment } from '../../environments/environments';

import { OrderRow } from '../models/orderRow';
import { ParcelMachine } from '../models/parcelMachine';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cart: OrderRow[] = JSON.parse(localStorage.getItem('cart') || '[]');
  parcelMachines: ParcelMachine[] = [];
  country: string = 'EE';

  private detectChange = inject(ChangeDetectorRef);

  ngOnInit() {
    this.fetchParcelMachines();
  }

  fetchParcelMachines() {
    fetch(`${backendUrl}/parcelMachines?country=${this.country}`)
      .then((response) => response.json())
      .then((data) => {
        this.parcelMachines = data;
        this.detectChange.detectChanges();
      });
  }

  changeCountry(country: string) {
    this.country = country;
    this.fetchParcelMachines();
  }

  totalPrice(): number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  removeFromCart(product: any): void {
    this.cart = this.cart.filter((item) => item.product.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  decreaseQuantity(index: number): void {
    const cartItem = this.cart[index];
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    if (cartItem && cartItem.quantity === 1) {
      this.removeFromCart(cartItem.product);
    }
  }

  increaseQuantity(index: number): void {
    const cartItem = this.cart[index];
    if (cartItem) {
      cartItem.quantity++;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  checkout(): void {
    fetch(`${backendUrl}/orders?personId=1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        this.cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      ),
    })
      .then((response) => response.json())
      .then((response) => {
        window.location.href = response.link;
      });
  }
}
