import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './login.html',

  styleUrl: './login.scss',
})
export class Login {
  error = '';

  loading = false;

  form;

  constructor(
    private auth: Auth,

    private router: Router,

    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
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
      .login(this.form.value)

      .subscribe({
        next: () => {
          this.loading = false;

          this.router.navigate(['/home']);
        },

        error: (err) => {
          this.loading = false;

          this.error = err?.error?.message || 'Login failed';
        },
      });
  }
}
