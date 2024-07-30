export function useSearchListApi(query) {
  return useHttpGet("searchList", () => {
    let q = useQueryToString(query());
    return `/search${q}`;
  }, {
    lazy: true,
  });
}

// Get a list of available coupons
export function useCouponListApi() {
  return useHttpGet("CouponList", "/coupon/list");
}

// General List
export function useListApi(type, query = {}) {
  let q = useQueryToString(query);
  return useHttpGet(type + "List", `/${type}/list${q}`, {
    lazy: true,
  });
}

// View course/section details
export function useReadDetailApi(type, query = {}) {
  let q = useQueryToString(query);
  return useHttpGet("readDetail", `/${type}/read${q}`, {
    lazy: true,
  });
}
