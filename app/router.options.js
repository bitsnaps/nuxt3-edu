export default {
  scrollBehavior(to, from, savedPosition) {
    // When you press the Back/Forward button, it will behave like the native browser
    if (savedPosition) {
      return savedPosition;
    }

    return {
      top: 0,
    };
  },
};
