import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar implements OnInit {
  cartCount = 0;

  isLoggedIn = false;


  constructor(private cartService: CartService, public auth: Auth) {}

  ngOnInit(): void {
    this.auth.authStatus.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.cartService.cart.subscribe((cart) => {
      this.cartCount = cart?.items?.reduce(
        (sum: number, item: any) => sum + item.quantity,

        0,
      );
    });

    
  }
  logout(){
      this.auth.logout();
    }
}
