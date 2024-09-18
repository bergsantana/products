<script setup lang="ts">
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


defineProps<{ isCreateModalOpen: boolean }>();

defineEmits<{
  (e: "update:isCreateModalOpen", payload: boolean): void;
}>();

const expireDate = ref()
</script>

<template>
  <div class="text-center pa-4">
    <v-btn @click="$emit('update:isCreateModalOpen', true)" color="green">
      Create
    </v-btn>

    <v-dialog :model-value="isCreateModalOpen" width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-pen-plus"
       
        title="Create a new product"
      >
        <template v-slot:text>
          <div>
            <form>
              <v-text-field
                max-width="350"
                label="Name"
                variant="outlined"
              >
                <template v-slot:label>
                  <span>
                    <v-icon icon="mdi-rename"></v-icon>Name
                  </span>
                </template>
              </v-text-field>
              <v-text-field
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
                max-width="350"
                label="Expire Date"
                variant="outlined"
              >
                <template v-slot:label>
                  
                  <VueDatePicker v-model="expireDate" />

                </template>
              </v-text-field>
              <v-text-field
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
            </form>
          </div>
        </template>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Create"
            variant="outlined"
            @click="$emit('update:isCreateModalOpen', false)"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
