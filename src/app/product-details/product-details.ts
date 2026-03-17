import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { environment } from '../../environments/environments';

import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  product!: Product;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}

  // @Autowired
  // private route = inject(ActivatedRoute);
  // pmst sama mis private route = new ActivatedRoute();

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('product_id');
    if (productId) {
      fetch(`${backendUrl}/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          this.product = data;
          this.changeDetector.detectChanges();
        });
    }
  }
}
