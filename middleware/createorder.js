const t = {
  course: "Course",
  column: "Column",
  live: "Live streaming",
  book: "E-book",
  group: "Group Buying",
  flashsale: "Flash Sale",
};
export default defineNuxtRouteMiddleware((to, from) => {
  const { id, type } = to.query;
  if (Object.keys(t).includes(type) && !isNaN(+id)) {
    useHead({ title: "Create Order" });
    return true;
  }
  return abortNavigation("Page does not exist");
});
