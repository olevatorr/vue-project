import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    cartItemCount: (state) => {
      let count = 0;
      state.items.forEach(item => {
        count += item.quantity;
      });
      return count;
    },
    cartTotal: (state) => {
      let total = 0;
      state.items.forEach(item => {
        total += item.price * item.quantity;
      });
      return total;
    },
  },
  actions: {
    addToCart(product) {
      const existingItem = this.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productId) {
      const index = this.items.findIndex((item) => item.id === productId);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    },
    increaseQuantity(productId) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity(productId) {
      const item = this.items.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else if (item) {
        this.removeFromCart(productId);
      }
    },
    clearCart() {
      this.items = [];
    },
  },
});
