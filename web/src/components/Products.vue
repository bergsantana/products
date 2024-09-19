<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from "vue";
import Header from "./Header.vue";
import { Product, ProductService } from "../services/Products.service";
import { useUserStore } from "../stores/userStore";
import CreateModal from "./CreateModal.vue";
import EditModal from "./EditModal.vue";
import DeleteModal from "./DeleteModal.vue";

const search = ref("");
const page = ref(1);
const pageSize = ref(10);
const total = ref(0);

const rendering = ref(false);
const isCreateModalOpen = ref(false);
const isEditingModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const products = ref<Product[]>([]);
const editingProduct = ref<Product>();
const idToDelete = ref(0);
const deletingProduct = ref("");

const populateData = async () => {
  rendering.value = true;
  const fetchedProducts = await ProductService.paginatedFindProducts(
    search.value,
    page.value
  );

  products.value = fetchedProducts.data;
  total.value = Math.ceil(fetchedProducts.count / pageSize.value);
  
  setTimeout(() => {
    rendering.value = false;

  }, 300)
};

const openEditModal = (product: Product) => {
  editingProduct.value = product;
  isEditingModalOpen.value = true;
};

const openDeleteModal = (id: number, productName: string) => {
  idToDelete.value = id;
  deletingProduct.value = productName
  isDeleteModalOpen.value = true;
};

onMounted(async () => {
  populateData();
});

watch(
  () => [search.value, page.value],
  async () => {
    rendering.value = true;
    await populateData();

    setTimeout(() => {
      rendering.value = false;
    });
  }
);

</script>

<template>
  <div class="bg-white p-2 flex flex-col gap-2">
    <h1>Products Page</h1>
    <Header
      v-model:search="search"
      @update:search="
        (data) => {
          console.log(`is it updating`, data);
          populateData()
        }
      "
    />

    <div v-if="rendering" class="h-96 flex items-center justify-center"> 
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <div class="flex justify-end">
        <CreateModal
          :isCreateModalOpen
          @update:isCreateModalOpen="
            (data) => {
              isCreateModalOpen = data;
              populateData()
            }
          "
        />

        <EditModal
          :isEditModalOpen="isEditingModalOpen"
          :product="editingProduct"
          @update:isEditModalOpen="
            (data) => {
              isEditingModalOpen = data;
              populateData()
            }
          "
        />

        <DeleteModal
          :isDeleteModalOpen="isDeleteModalOpen"
          :id="idToDelete"
          :name="deletingProduct"
          @update:isDeleteModalOpen="
            (data) => {
              isDeleteModalOpen = data;
              populateData()
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
                <img
                  :src="product.image"
                  class="h-36 mx-auto"
                  alt="Product photo"
                />
              </template>

              <v-card-text v-text="product.description"></v-card-text>

              <template v-slot:actions>
                <v-btn
                  variant="plain"
                  size="75"
                  text="Edit"
                  @click="() => openEditModal(product)"
                ></v-btn>
                <v-btn
                  variant="plain"
                  color="red"
                  size="75"
                  text="Delete"
                  @click="() => openDeleteModal(product.id!, product.name)"
                ></v-btn>
              </template>
            </v-card>
          </div>
        </div>
      </div>

      <v-pagination
        v-model="page"
        :length="total"
        rounded="circle"
      ></v-pagination>
    </div>
  </div>
</template>
