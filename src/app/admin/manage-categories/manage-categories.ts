import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { environment } from '../../../environments/environments';
import { Category } from '../../models/category';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-manage-categories',
  imports: [FormsModule],
  templateUrl: './manage-categories.html',
  styleUrl: './manage-categories.css',
})
export class ManageCategories {
  categories: Category[] = [];
  newCategoryName: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    fetch(`${backendUrl}/categories`)
      .then((response) => response.json())
      .then((data) => {
        this.categories = data;
        this.cdr.detectChanges();
      });
  }

  addCategory(name: string) {
    fetch(`${backendUrl}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((newCategory) => {
        this.categories = [...this.categories, newCategory];
        this.cdr.detectChanges();
      });
  }

  deleteCategory(categoryId: number) {
    fetch(`${backendUrl}/categories/${categoryId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        this.categories = data;
        this.cdr.detectChanges();
      });
  }
}
