import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { Pizza } from '../../services/pizza';

import { CartService } from '../../services/cart';

@Component({
  selector: 'app-home',

  standalone: true,

  imports: [CommonModule, RouterModule],

  templateUrl: './home.html',

  styleUrl: './home.scss',
})
export class Home implements OnInit {
  pizzas: any[] = [];

  loading = true;

  constructor(
    private pizzaService: Pizza,

    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.getAllPizzas();
  }

  getAllPizzas() {
    this.pizzaService
      .getPizzas()

      .subscribe({
        next: (data) => {
          this.pizzas = data;

          this.loading = false;
        },

        error: (err) => {
          console.error(err);

          this.loading = false;
        },
      });
  }

  addToCart(pizza: any) {
    this.cartService

      .addToCart(pizza._id, [], 1)

      .subscribe({
        next: () => {
          alert('Pizza added to cart');
        },

        error: (err) => {
          console.error(err);
        },
      });
  }
}
