// Login
export function useLoginApi(body) {
  return useHttpPost("login", "/login", {
    body,
  });
}

// register
export function useRegApi(body) {
  return useHttpPost("reg", "/reg", {
    body,
  });
}

export function useGetinfoApi() {
  return useHttpGet("getinfo", "/getinfo", {
    $: true,
  });
}

// logout
export function useLogoutApi() {
  return useHttpPost("logout", "/logout");
}

// Get mobile verification code
export function useGetCaptchaApi(phone) {
  return useHttpPost("GetCaptcha", "/get_captcha", {
    body: {
      phone,
    },
  });
}

// Bind mobile phone number
export function useBindPhoneApi(body) {
  return useHttpPost("bindphone", "/bind_mobile", {
    body,
  });
}

// forget the password
export function useForgetApi(body) {
  return useHttpPost("forget", "/forget", {
    body,
  });
}

// Get learning records
export function useUserHistoryApi(query) {
  return useHttpGet("userHistory", () => {
    let q = useQueryToString(query());
    return `/user_history/list${q}`;
  }, {
    lazy: true,
  });
}

// Get purchase records
export function useOrderListApi(page) {
  return useHttpGet("OrderList", `/order/list?page=${page}`, {
    lazy: true,
  });
}

// My exam records
export function useUserTestApi(page) {
  return useHttpGet("UserTest", `/user_test/list?page=${page}`, {
    lazy: true,
  });
}

// My Posts List
export function useMypostListApi(page) {
  return useHttpGet("MypostList", `/mypost?page=${page}`, {
    lazy: true,
  });
}

// Get coupon records
export function useUserCouponApi(page) {
  return useHttpGet("UserCoupon", `/user_coupon?page=${page}`, {
    lazy: true,
  });
}

// My favorites list
export function useMyFavaListApi(page) {
  return useHttpGet("MyFavaList", `/user_fava?page=${page}`, {
    lazy: true,
  });
}

// Remove from favorites
export function useUncollectApi(body) {
  return useHttpPost("Uncollect", "/uncollect", {
    body,
  });
}

// Collect
export function useCollectApi(body) {
  return useHttpPost("collect", "/collect", {
    body,
  });
}

// Modify information
export function useUpdateUserInfoApi(body) {
  return useHttpPost("updateUserInfo", "/update_info", {
    body,
  });
}

// upload image
export function useUploadConfig() {
  const token = useCookie("token");
  return {
    action: fetchConfig.baseURL + "/upload",
    headers: {
      appid: fetchConfig.headers.appid,
      token: token.value,
    },
  };
}

// change Password
export function useupdatePasswordApi(body) {
  return useHttpPost("updatePassword", "/update_password", {
    body,
  });
}

// Get coupons
export function useReceiveUserCouponApi(body) {
  return useHttpPost("receiveUserCoupon", "/user_coupon/receive", {
    body,
  });
}
