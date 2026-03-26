import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { environment } from '../../environments/environments';

import { Product } from '../models/product';
import { OrderRow } from '../models/orderRow';
import { ProductsPage } from '../models/productPage';
import { Category } from '../models/category';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-homepage',
  imports: [RouterLink, FormsModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  productsPage: ProductsPage = {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 0,
  };
  categories: Category[] = [];
  pageNumber = signal(0);
  pageSize = signal(5);
  sortBy = signal('id');
  sortOrder = signal('asc');
  sortCategory = signal('');

  private detectChange = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      this.pageNumber();
      this.sortBy();
      this.pageSize();
      this.sortOrder();
      this.sortCategory();
      this.fetchProducts();
    });
  }

  ngOnInit() {
    this.fetchProducts();
    fetch(`${backendUrl}/categories`)
      .then((response) => response.json())
      .then((data) => {
        this.categories = data;
      });
  }

  private fetchProducts() {
    fetch(
      `${backendUrl}/products?${this.sortCategory() ? `categoryId=${this.sortCategory()}` : ''}&page=${this.pageNumber()}&size=${this.pageSize()}&sort=${this.sortBy()},${this.sortOrder()}`,
    )
      .then((response) => response.json())
      .then((data) => {
        this.productsPage = data;
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
