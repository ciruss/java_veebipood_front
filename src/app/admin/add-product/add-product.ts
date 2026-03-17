import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { environment } from '../../../environments/environments';

import { Product } from '../../models/product';
import { Category } from '../../models/category';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    active: true,
    category: { id: 0, name: '' },
  };
  categories: Category[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    fetch(`${backendUrl}/categories`)
      .then((response) => response.json())
      .then((data) => {
        this.categories = data;
        this.cdr.detectChanges();
      });
  }

  addProduct() {
    fetch(`${backendUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.product),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product added:', data);
        this.product = {} as Product;
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  }
}
