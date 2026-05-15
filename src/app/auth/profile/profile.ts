import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { environment } from '../../../environments/environments';
import { Person } from '../../models/person';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  person: Partial<Person> = {};
  roles = ['CUSTOMER', 'ADMIN', 'SUPERADMIN'];

  private detectChange = inject(ChangeDetectorRef);

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile() {
    fetch(`${backendUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.person = data;
        this.detectChange.detectChanges();
      })
      .catch(() => {
        alert('An error occurred while fetching profile. Please try again.');
      });
  }

  updateProfile() {
    fetch(`${backendUrl}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify(this.person),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message && data.status && data.timestamp) {
          alert(data.message);
        } else {
          this.person = data;
          alert('Profile updated successfully.');
        }
      })
      .catch(() => {
        alert('An error occurred. Please try again.');
      });
  }
}
