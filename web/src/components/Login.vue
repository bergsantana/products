<script setup lang="ts">
import { ref } from "vue";
import { Login } from "../services/Auth.service";
import { useToast } from "vue-toast-notification";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const $toast = useToast();
const userStore = useUserStore()
const router = useRouter()

const loading = ref(false);

const loginData = ref<Login>({
  email: "",
  password: "",
});

const goToRegister = () => router.push('register')

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  loading.value = true;
   

  try {
    if(!loginData.value.email && !loginData.value.password ) {
        throw new Error('Invalid login or password')
    }

    const {useLogin } = userStore

    await useLogin({
        email: loginData.value.email,
        password: loginData.value.password
    }) 
    $toast.success("Sucessfully logged in!", { position: "top-right" });

    router.push('/')

  } catch (err) {
   
    $toast.error('Unable to login, check your inputs' , { position: 'top-right'})
  }

  setTimeout(() => 
  loading.value = false, 300
)
};
</script>

<template>
  <div
    class="m-auto w-96 h-full lg:p-2 flex flex-col items-center justify-center gap-4"
  >
    <form
      class="w-[90%] mx-auto lg:w-96 p-4 gap-4 border-gray-500 border-2 rounded-lg flex flex-col items-center"
    >
      <v-text-field
        class="w-full"
        label="E-mail"
        v-model="loginData.email"
        variant="solo-inverted"
      ></v-text-field>
      <v-text-field
        class="w-full"
        label="Password"
        v-model="loginData.password"
        variant="solo-inverted"
        type="password"
      ></v-text-field>

      <v-btn @click="handleSubmit" type="submit" class="w-48" :loading="loading"
        >Login</v-btn
      >
    </form>
    <p>
      <v-btn @click="goToRegister" variant="text" color="#0000ff"
        >Register here</v-btn
      >
    </p>
 
  </div>
</template>
