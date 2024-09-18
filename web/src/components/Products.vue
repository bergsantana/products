<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from "vue";
import Header from "./Header.vue";
import { Product, ProductService } from "../services/Products.service";
import { useUserStore } from "../stores/userStore";
import CreateModal from "./CreateModal.vue";

const search = ref("");
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);

const rendering = ref(false);
const isCreateModalOpen = ref(false);

const products = ref<Product[]>([]);

const populateData = async () => {
  const fetchedProducts = await ProductService.paginatedFindProducts(
    search.value,
    page.value
  );

  products.value = fetchedProducts.data;
  console.log("products", products.value);

  console.log("feteched", fetchedProducts);
};

onMounted(async () => {
  console.log("onmount");
  populateData();
});

watch(
  () => [search.value, page.value],
  async () => {
    rendering.value = true;
    await populateData();

    rendering.value = false;
  }
);
</script>

<template>
  <div class="bg-white p-2 flex flex-col gap-2">
    <h1>Products Page</h1>

    <Header :search="search" :page="page" />
    <div class="flex justify-end">
      
    <CreateModal
      :isCreateModalOpen
      @update:isCreateModalOpen="
        (data) => {
          isCreateModalOpen = data;
        }
      "
    />
    </div>
    <div class="flex p-2 gap-2">
      <div v-for="(product, i) in products" :key="i" class="w-56">
        <v-skeleton-loader v-if="rendering" type="card"></v-skeleton-loader>
        <div v-else>
          <v-card class="bg-white border-2 rounded-md">
            <v-card-subtitle v-text="product.price"></v-card-subtitle>

            <template v-slot:title>
              <p v-text="product.name"></p>
              <img :src="product.image" alt="Product photo" />
            </template>

            <v-card-text v-text="product.description"></v-card-text>

            <template v-slot:actions>
              <v-btn variant="plain" size="75" text="Edit"></v-btn>
              <v-btn
                variant="plain"
                color="red"
                size="75"
                text="Delete"
              ></v-btn>
            </template>
          </v-card>
        </div>
      </div>
    </div>

    <v-pagination v-model="page" :length="4" rounded="circle"></v-pagination>
 
  </div>
</template>
