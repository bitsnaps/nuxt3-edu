export default defineNuxtRouteMiddleware((to, from) => {
  const { type, page } = to.params;
  const { keyword } = to.query;

  if (!keyword) {
    return abortNavigation("Search keyword cannot be empty");
  }

  if (!(["course", "column"].includes(type)) || isNaN(+page)) {
    return abortNavigation("Page does not exist");
  }
});
