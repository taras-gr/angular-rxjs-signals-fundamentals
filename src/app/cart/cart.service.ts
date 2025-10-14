import { computed, effect, Injectable, signal } from "@angular/core";
import { CartItem } from "./cart";
import { Product } from "../products/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() => this.cartItems().reduce((s, a) => s + a.quantity, 0));

  subTotal = computed(() => this.cartItems().reduce((accTotal, item) => 
    accTotal + (item.quantity * item.product.price), 0));

  deliveryFree = computed(() => this.subTotal() < 50 ? 5.99 : 0);

  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);

  totalPrice = computed(() => this.subTotal() + this.deliveryFree() + this.tax());

  elength = effect(() => console.log(this.cartItems().length));

  addToCart(product: Product): void {
    this.cartItems.update(items => [...items, {product, quantity: 1 }]);
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartItems.update(items => 
      items.filter(item => item.product.id !== cartItem.product.id));
  }

  udpateQuantity(cartItem: CartItem, quantity: number) {
    this.cartItems.update(items => 
      items.map(item => item.product.id === cartItem.product.id ? 
        { ...item, quantity} : item
      ));
  }
}
