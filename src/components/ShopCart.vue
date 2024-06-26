<template>
    <div class="cart-container">
        <!-- Cart Icon -->
        <div @click="toggleCart"
            class="cart-icon bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 cursor-pointer shadow-lg transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartItemCount > 0"
                class="cart-count absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {{ cartItemCount }}
            </span>
        </div>
        <!-- Cart Panel -->
        <div v-if="isOpen" class="cart-panel bg-white border border-gray-200 rounded-lg shadow-xl p-4 mt-2">
            <h2 class="text-xl font-bold mb-4">Shopping Cart</h2>
            <div v-if="cartItemCount === 0" class="text-gray-500">
                Your cart is empty
            </div>
            <ul v-else>
                <li v-for="item in cartItems" :key="item.id"
                    class="flex justify-between items-center mb-2 p-2 border-b">
                    <div class="flex-grow">
                        <span class="font-semibold">{{ item.name }}</span>
                        <br />
                        <span class="text-sm text-gray-600">${{ item.price.toFixed(2) }} each</span>
                    </div>
                    <div class="flex items-center">
                        <button @click="decreaseQuantity(item.id)" class="bg-gray-200 px-2 py-1 rounded-l">
                            -
                        </button>
                        <span class="px-2 py-1 bg-gray-100">{{ item.quantity }}</span>
                        <button @click="increaseQuantity(item.id)" class="bg-gray-200 px-2 py-1 rounded-r">
                            +
                        </button>
                    </div>
                    <button @click="removeFromCart(item.id)"
                        class="ml-2 text-white bg-red-500 px-2 py-1 rounded hover:bg-red-700 duration-500">
                        Remove
                    </button>
                </li>
            </ul>
            <div v-if="cartItemCount > 0" class="mt-4">
                <div class="font-bold text-xl">Total: ${{ cartTotal.toFixed(2) }}</div>
                <button @click="checkout"
                    class="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full">
                    Checkout
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useCartStore } from '../stores/cartStore';
import { mapState, mapActions } from 'pinia';

export default {
    data() {
        return {
            isOpen: false,
        };
    },
    computed: {
        ...mapState(useCartStore, ['cartItemCount', 'cartTotal', 'items']),
        cartItems() {
            return this.items;
        },
    },
    methods: {
        ...mapActions(useCartStore, [
            'removeFromCart',
            'clearCart',
            'increaseQuantity',
            'decreaseQuantity',
        ]),
        toggleCart() {
            this.isOpen = !this.isOpen;
        },
        checkout() {
            this.clearCart();
            this.isOpen = false;
        },
    },
};
</script>

<style scoped>
.cart-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
}

.cart-panel {
    position: absolute;
    top: 100%;
    right: 0;
    width: 500px;
    max-height: 400px;
    overflow-y: auto;
}
</style>