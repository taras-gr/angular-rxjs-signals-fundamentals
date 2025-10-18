import { Component, computed, inject, Input } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe, AsyncPipe } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError, EMPTY } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';

@Component({
    selector: 'pm-product-detail',
    templateUrl: './product-detail.component.html',
    standalone: true,
    imports: [NgIf, NgFor, CurrencyPipe, AsyncPipe]
})
export class ProductDetailComponent {

  private productsService = inject(ProductService);
  private cartService = inject(CartService);

  product = this.productsService.product;
  errorMessage = this.productsService.productError;

  // Product to display
  // product$ = this.productsService.product$
  //   .pipe(
  //     catchError(err => {
  //       this.errorMessage = err;
  //       return EMPTY;
  //     })
  //   );

  // Set the page title
  //pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';
  pageTitle = computed(() => 
   this.product()
      ? `Product Detail for: ${this.product()?.productName}`
      : 'Product Detail');

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
