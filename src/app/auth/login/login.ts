import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environments';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  router = inject(Router);

  login() {
    fetch(`${backendUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: this.email, password: this.password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message && data.status && data.timestamp) {
          alert(data.message);
        } else {
          this.router.navigateByUrl('/profile');
          sessionStorage.setItem('token', data.token);
        }
      })
      .catch(() => {
        alert('An error occurred. Please try again.');
      });
  }
}
