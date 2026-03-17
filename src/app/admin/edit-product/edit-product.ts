import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { environment } from '../../../environments/environments';
import { Product } from '../../models/product';
import { Category } from '../../models/category';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-edit-product',
  imports: [FormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class EditProduct {
  product!: Product;
  categories: Category[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

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

    fetch(`${backendUrl}/categories`)
      .then((response) => response.json())
      .then((data) => {
        this.categories = data;
        this.changeDetector.detectChanges();
      });
  }

  editProduct() {
    fetch(`${backendUrl}/products`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.product),
    })
      .then((response) => response.json())
      .then(() => {
        this.router.navigateByUrl('/admin/manage-products');
      })
      .catch((error) => {
        console.error('Error editing product:', error);
      });
  }
}
