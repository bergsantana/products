<script setup lang="ts">
import { onBeforeMount, onUpdated, ref } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { useToast } from "vue-toast-notification";
import { ProductService } from "../services/Products.service";

const props = defineProps<{ isDeleteModalOpen: boolean; id: number, name: string }>();

const emit = defineEmits<{
  (e: "update:isDeleteModalOpen", payload: boolean): void;
}>();

const $toast = useToast();

const isLoading = ref(false);

const id = ref(0);
const name = ref("");

const closeModal = () => {
  emit("update:isDeleteModalOpen", false);
};

const handleSubmit = async () => {
  isLoading.value = true;
  if (name.value) {
    const requisition = await ProductService.delete(props.id);

    closeModal()
    $toast.success("Product successfully deleted");
    isLoading.value = false;


    return;
  }

  setTimeout(() => {
    isLoading.value = false;
    $toast.error("Error while deleting product");
  });
};

onUpdated(() => name.value = props.name)
</script>

<template>
  <div class="text-center pa-4">
    <v-dialog
      :model-value="isDeleteModalOpen"
      width="auto"
      @after-leave="closeModal"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-pen-plus"
        title="Create a new product"
      >
        <template v-slot:text>
          <h4>Are you certain you want to delete "{{ name }}"?</h4>
        </template>
        <template v-slot:actions>
          <div class="flex gap-2 p-2">
            <v-btn
              v-text="'Cancel'"
              variant="outlined"
              @click="closeModal"
            ></v-btn>
            <v-btn
              :loading="isLoading"
              text="Delete"
              variant="outlined"
              @click="handleSubmit"
            ></v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
