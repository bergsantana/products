<script setup lang="ts">
import { onBeforeMount, onMounted, onUpdated, ref, watch } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useToast } from "vue-toast-notification";
import { Product, ProductService } from "../services/Products.service";

const props = defineProps<{ isEditModalOpen: boolean, product: Product | undefined,  }>();

const emit = defineEmits<{
  (e: "update:isEditModalOpen", payload: boolean): void;
}>();

const $toast = useToast();

const isLoading = ref(false);

const id = ref<number>(0)
const name = ref("");
const description = ref("");
const price = ref(0);
const expireDate = ref(new Date());
const category = ref("");
const imageLink = ref("");


const closeModal = () => {
  emit("update:isEditModalOpen", false)
}

const handleSubmit = async () => {
  console.log(`testing submit`,     name.value ,
    description.value ,
    category.value ,
    imageLink.value ,
    price.value)
  if (
    name.value &&
    description.value &&
    category.value &&
    imageLink.value &&
    price.value
  ) {
    const requisition = await ProductService.update({
      id: id.value!,
      name: name.value,
      description: description.value,
      expireDate: expireDate.value,
      categoryName: category.value,
      price: price.value,
      image: imageLink.value,
    });

    $toast.success("Product successfully edited");
    emit('update:isEditModalOpen', false)
    return;
  }

  $toast.error("Please check all input fields");
};

onUpdated(() => {
  id.value = props.product?.id ?? 0
  name.value = props.product?.name ?? ""
  description.value = props.product?.description ?? ""
  category.value = props.product?.categoryName ?? ""
  price.value = props.product?.price ?? 0
  imageLink.value = props.product?.image ?? ''
  expireDate.value = props.product?.expireDate ? new Date( props.product?.expireDate) : new Date()

  console.log(`props`, props.product)
}) 

</script>

<template>
  <div class="text-center pa-4">


    <v-dialog :model-value="isEditModalOpen" width="auto" @after-leave="closeModal"> 
      <v-card
        max-width="400"
        prepend-icon="mdi-pen-plus"
        title="Editing a product"
      >
        <template v-slot:text>
          <div>
            <form>
              <v-text-field
                :model-value="product?.name"
                
                max-width="350"
                label="Name"
                variant="outlined"
                @update:model-value="(newName) => name = newName"
              >
                <template v-slot:label>
                  <span> <v-icon icon="mdi-rename"></v-icon>Name </span>
                </template>
              </v-text-field>
              
              <v-text-field
                :model-value="product?.description"
                max-width="350"
                label="description"
                variant="outlined"
                @update:model-value="(newDescription) => description = newDescription"
              >
                <template v-slot:label>
                  <span>
                    <v-icon icon="mdi-text-box"></v-icon>Description
                  </span>
                </template>
              </v-text-field>

              <v-text-field
                :model-value="product?.price"
               
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
              <v-date-picker 
                v-model="expireDate"
               :min="new Date()">
                <template v-slot:title>
                  <h1>Expiration Date</h1>
                </template>
              </v-date-picker>

              <v-text-field
                :model-value="product?.categoryName"
                @update:model-value="(newValue) => category = newValue"
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
              :model-value="product?.image"
                @update:model-value="(newValue) => imageLink= newValue"
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
        <template v-slot:actions class="p-4">
          <div class="flex gap-2 p-4">

            <v-btn
              :loading="isLoading"
              class="ms-auto"
              text="Cancel"
              variant="outlined"
              @click="closeModal"
            ></v-btn>
            <v-btn
              :loading="isLoading"
              class="ms-auto"
              text="Edit"
              variant="outlined"
              @click="handleSubmit"
            ></v-btn>
          </div>
          
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
