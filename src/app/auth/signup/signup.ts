import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Person } from '../../models/person';
import { environment } from '../../../environments/environments';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  person: Partial<Person> = {};
  roles = ['CUSTOMER', 'ADMIN', 'SUPERADMIN'];

  router = inject(Router);

  signup() {
    fetch(`${backendUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.person),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message && data.status && data.timestamp) {
          alert(data.message);
        } else {
          this.router.navigateByUrl('/login');
        }
      })
      .catch(() => {
        alert('An error occurred. Please try again.');
      });
  }
}
