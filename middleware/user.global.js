export default defineNuxtRouteMiddleware(async (to, from) => {
  // 2024-1-5 Add enforce = false to prevent repeated refresh of user information
  await useRefreshUserInfo(false);
});
