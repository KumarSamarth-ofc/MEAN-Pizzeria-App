import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './register.html',

  styleUrl: './register.scss',
})
export class Register {
  error = '';

  loading = false;

  form;

  constructor(
    private auth: Auth,

    private router: Router,

    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    this.error = '';

    this.auth

      .register(this.form.value)

      .subscribe({
        next: () => {
          this.loading = false;

          alert('Registration successful');

          this.router.navigate(['/login']);
        },

        error: (err) => {
          this.loading = false;

          this.error = err?.error?.message || 'Registration failed';
        },
      });
  }
}
