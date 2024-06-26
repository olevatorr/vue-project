<template>
    <div class="xl:container mx-auto p-4">
        <div>
            <p class="text-3xl font-bold">Olevatorr Shop</p>
        </div>
        <!-- search bar : 輸入文字時可以尋找brand/category/name -->
        <input v-model="searchQuery" type="search"
            class="h-8 border my-3 rounded focus:outline-none focus:border-green-500 duration-500 p-2 border-box w-52"
            placeholder="Search Products" />
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <!-- card : 使用json外部資料渲染-->
            <div v-for="product in filteredProducts" :key="product.id"
                class="p-3 border-box rounded-lg border border-dark-500 w-full flex flex-col">
                <img :src="product.img" :alt="product.name"
                    class="aspect-square overflow-hidden object-cover rounded" />
                <div>
                    <p class="mt-2 bg-teal-700 px-2 py-1 text-white rounded inline-block">{{ product.category }}</p>
                </div>
                <p class="mt-2 text-sm">{{ product.brand }}</p>
                <p class="mb-2 text-xl grow">{{ product.name }}</p>
                <div class="mt-10 flex justify-between items-center">
                    <p class="text-xl font-bold">${{ product.price.toFixed(2) }}</p>
                    <!-- 加入購物車 -->
                    <div @click="addToCart(product)"
                        class="px-2 py-1 bg-rose-500 rounded text-white cursor-pointer hover:bg-rose-900 duration-500 text-xl">
                        +
                    </div>
                </div>
            </div>
        </div>
        <Cart />
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useCartStore } from '@/stores/cartStore';
import Cart from '@/components/ShopCart.vue';

export default {
    components: {
        Cart,
    },
    data() {
        return {
            products: [],
            searchQuery: '',
        };
    },
    computed: {
        filteredProducts() {
            if (!this.searchQuery) return this.products;
            const query = this.searchQuery.toLowerCase();
            return this.products.filter(
                (product) =>
                    product.name.toLowerCase().includes(query) ||
                    product.brand.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
            );
        },
    },
    methods: {
        ...mapActions(useCartStore, ['addToCart']),
        fetchProducts() {
            fetch(`${import.meta.env.VITE_API_URL}src/assets/json/products.json`)
                .then((res) => res.json())
                .then((jsonData) => {
                    console.log(jsonData);
                    this.products = jsonData;
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
    },
    mounted() {
        this.fetchProducts();
    },
};
</script>