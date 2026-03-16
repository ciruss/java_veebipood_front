import { Component } from '@angular/core';
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

  ngOnInit() {
    fetch(`${backendUrl}/categories`)
      .then((response) => response.json())
      .then((data) => {
        this.categories = data;
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
        this.categories.push(newCategory);
      });
  }

  deleteCategory(categoryId: number) {
    fetch(`${backendUrl}/categories/${categoryId}`, {
      method: 'DELETE',
    }).then(() => {
      this.categories = this.categories.filter((cat) => cat.id !== categoryId);
    });
  }
}
