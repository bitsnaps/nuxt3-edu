import { createDiscreteApi } from "naive-ui";
export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");
  const user = useUser();
  const route = useRoute();

  // Not logged in
  if (!token.value) {
    if (process.client) {
      const { message } = createDiscreteApi(["message"]);
      message.error("please log in first");
    }
    return navigateTo("/login?from=" + route.fullPath);
  }
  // No mobile phone number bound
  const phone = user.value?.phone;
  if (!phone && route.name != "bindphone") {
    if (process.client) {
      const { message } = createDiscreteApi(["message"]);
      message.error("Please bind your mobile number first");
    }
    return navigateTo("/bindphone?from=" + route.fullPath);
  }
});
