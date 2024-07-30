import { createDiscreteApi } from "naive-ui";
export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");
  // Already logged in, force redirect to home page
  if (token.value) {
    // Client-side rendering
    if (process.client) {
      const { message } = createDiscreteApi(["message"]);
      message.error("Please do not log in again");
    }
    return "/";
  }
});
