import { defineStore } from "pinia";
import { Login, UserData, UserService } from "../services/Auth.service";
import { ref } from "vue";
import { useBearerToken } from "../lib/api";
import { whenever } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserData | undefined>();
  const token = ref<string | null>();

  const storedState = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  if (storedState) {
    user.value = JSON.parse(storedState);
  }
  if (storedToken) {
    token.value = storedToken;
  }

  const userService = UserService;

  const useLogin = async (auth: Login) => {
    const jwtToken = await userService.login(auth);

    token.value = jwtToken;
    localStorage.setItem("token", jwtToken.toString());
     

    if (jwtToken) user.value = auth;
  };

  const useRegister = async (user: UserData) => {
    return await userService.register(user);
  };

  const useUpdateUser = async (id: number, user: UserData) => {
    return await userService.updateUser(id, user);
  };

  const useLogout = async () => {
    user.value = undefined;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log('after logout', user.value)
  };

  whenever(token, async () => {
    useBearerToken(token.value!);
    if (token.value && user.value)
      user.value = await userService.findOne(user.value?.email);
    localStorage.setItem("user", JSON.stringify(user.value ?? "{}"));
  });

  return {
    user,
    token,
    useLogin,
    useRegister,
    useUpdateUser,
    useLogout,
  };
});
