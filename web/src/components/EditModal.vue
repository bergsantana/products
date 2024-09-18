<script setup lang="ts">
import { ref } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { useToast } from "vue-toast-notification";
import { ProductService } from "../services/Products.service";

defineProps<{ isEditModalOpen: boolean }>();

defineEmits<{
  (e: "update:isEditModalOpen", payload: boolean): void;
}>();

const $toast = useToast();

const isLoading = ref(false);

const name = ref("");
const description = ref("");
const price = ref(0);
const expireDate = ref(new Date());
const category = ref("");
const imageLink = ref("");

const handleSubmit = async () => {
  if (
    name.value &&
    description.value &&
    category.value &&
    imageLink.value &&
    price.value
  ) {
    const requisition = await ProductService.create({
      name: name.value,
      description: description.value,
      expireDate: expireDate.value,
      categoryName: category.value,
      price: price.value,
      image: imageLink.value,
    });

    console.log("SUces?", requisition);

    $toast.success("Product successfully created");
    return;
  }

  $toast.error("Please check all input fields");
};
</script>

<template>
  <div class="text-center pa-4">
    <v-btn @click="$emit('update:isEditModalOpen', true)" color="green">
      Create
    </v-btn>

    <v-dialog :model-value="isEditModalOpen" width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-pen-plus"
        title="Create a new product"
      >
        <template v-slot:text>
          <div>
            <form>
              <v-text-field
                v-model="name"
                max-width="350"
                label="Name"
                variant="outlined"
              >
                <template v-slot:label>
                  <span> <v-icon icon="mdi-rename"></v-icon>Name </span>
                </template>
              </v-text-field>
              <v-text-field
                v-model="description"
                max-width="350"
                label="description"
                variant="outlined"
              >
                <template v-slot:label>
                  <span>
                    <v-icon icon="mdi-text-box"></v-icon>Description
                  </span>
                </template>
              </v-text-field>

              <v-text-field
                v-model="price"
                max-width="350"
                label="Price"
                variant="outlined"
                type="number"
                @update:model-value="(newPrice) => (price = parseInt(newPrice))"
              >
                <template v-slot:label>
                  <span> <v-icon icon="mdi-text-box"></v-icon>price </span>
                </template>
              </v-text-field>
              <v-date-picker v-model="expireDate" :min="new Date()">
                <template v-slot:title>
                  <h1>Expiration Date</h1>
                </template>
              </v-date-picker>

              <v-text-field
                v-model="category"
                max-width="350"
                label="Category"
                variant="outlined"
              >
                <template v-slot:label>
                  <span>
                    <v-icon icon="mdi-dots-vertical"></v-icon>Category
                  </span>
                </template>
              </v-text-field>

              <v-text-field
                v-model="imageLink"
                max-width="350"
                label="Image Link"
                variant="outlined"
              >
                <template v-slot:label>
                  <span> <v-icon icon="mdi-link"></v-icon>Image Link </span>
                </template>
              </v-text-field>
            </form>
          </div>
        </template>
        <template v-slot:actions>
          <v-btn
            :loading="isLoading"
            class="ms-auto"
            text="Create"
            variant="outlined"
            @click="handleSubmit"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
