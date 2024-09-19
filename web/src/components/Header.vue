<script setup lang="ts">
 
import { useRouter } from "vue-router";
import { SearchProps } from "../intefaces/search";
import { SearchEmits } from "../intefaces/search";
import { useUserStore } from "../stores/userStore";

defineProps<SearchProps>();

const emit = defineEmits<SearchEmits>();

const router = useRouter()
const userStore = useUserStore()

const handleEmitSearch = (val : string) => {
  emit("update:search", val)
}

const handleClick = async () => {
  
        await userStore.useLogout()
        router.push('/auth/login')
   
 }

</script>

<template>
  <div>
    <v-toolbar class="flex p-2" dense floating rounded="lg">
      <v-text-field
        max-width="350"
        size=""
        label="Search products"
        :model-value="search"
        @update:model-value="val => handleEmitSearch(val)"
      >
        <template v-slot:label>
          <span>
            <v-icon icon="mdi-file-find"></v-icon> Name or description
          </span>
        </template>
      </v-text-field>
      <div>
        <v-btn variant="outlined" class="ml-4" @click=handleClick> {{
             'Logout'   
        }} </v-btn>
      </div>
    </v-toolbar>
  </div>
</template>
