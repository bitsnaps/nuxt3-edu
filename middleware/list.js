const t = {
  course: "Course",
  column: "Column",
  live: "Live streaming",
  book: "E-book",
  group: "Group Buying",
  flashsale: "Flash Sale",
};
export default defineNuxtRouteMiddleware((to, from) => {
  const { type, page } = to.params;
  if (Object.keys(t).includes(type) && !isNaN(+page)) {
    const title = t[type] + "List";
    to.meta.title = title;
    useHead({ title });
    return true;
  }
  return abortNavigation("Page does not exist");
});
