<script setup lang="ts">
import { ref } from "vue";
import { UserData } from "../services/Auth.service";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { useToast } from "vue-toast-notification";

const $toast = useToast();
const router = useRouter();
const userStore = useUserStore();

const loading = ref(false);

const registerData = ref<UserData>({
  email: "",
  password: "",
  name: "",
});

const goToLogin = () => router.push(`login`);

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  loading.value = true;

  try {
    if (!registerData.value.email || !registerData.value.password) {
      throw new Error("Invalid login or password");
    }

    const { useRegister } = userStore;

    await useRegister({
      email: registerData.value.email,
      password: registerData.value.password,
      name: registerData.value.name,
    });
    $toast.success("Sucessfully registered!", { position: "top-right" });

    router.push("login");
  } catch (err) {
    $toast.error("Unable to register, check your inputs", {
      position: "top-right",
    });
  }

  setTimeout(() => (loading.value = false), 300);
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
        v-model="registerData.email"
        variant="solo-inverted"
      ></v-text-field>
      <v-text-field
        class="w-full"
        label="Name"
        v-model="registerData.name"
        variant="solo-inverted"
        type="text"
      ></v-text-field>
      <v-text-field
        class="w-full"
        label="Password"
        v-model="registerData.password"
        variant="solo-inverted"
        type="password"
      ></v-text-field>

      <v-btn @click="handleSubmit" type="submit" class="w-48" :loading="loading"
        >Register</v-btn
      >
    </form>
    <p>
      <v-btn @click="goToLogin" variant="text" color="#0000ff"
        >Login here</v-btn
      >
    </p>
  </div>
</template>
