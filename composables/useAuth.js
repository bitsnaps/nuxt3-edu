import { createDiscreteApi } from "naive-ui";

export const useUser = () => useState("user", () => null);

// Update User Information
export async function useRefreshUserInfo(enforce = true) {
  const token = useCookie("token");
  const user = useUser();
  // The user has logged in, directly obtain user information
  // 2024-1-5 Add user.value === null and enforce controls to prevent duplicate requests
  if (token.value && (user.value === null || enforce)) {
    let {
      data,
      error,
    } = await useGetinfoApi();

    if (data.value) {
      user.value = data.value;
    }
  }
}

// sign out
export async function useLogout() {
  await useLogoutApi();
  const user = useUser();
  user.value = null;
  const token = useCookie("token");
  token.value = null;
  const { message } = createDiscreteApi(["message"]);
  message.success("Logout successful");
  // back to the homepage
  const route = useRoute();
  if (route.path != "/") {
    navigateTo("/", { replace: true });
  }
}

// You can only operate after logging in and binding your mobile phone number
export function useHasAuth(callback = null) {
  const route = useRoute();
  const token = useCookie("token");
  const user = useUser();
  const { message } = createDiscreteApi(["message"]);
  // Not logged in
  if (!token.value) {
    message.error("please log in first");
    return navigateTo("/login?from=" + route.fullPath);
  }

  // No mobile phone number bound
  const phone = user.value?.phone;
  if (!phone && route.name != "bindphone") {
    message.error("Please bind your mobile number first");
    return navigateTo("/bindphone?from=" + route.fullPath);
  }

  if (callback && typeof callback === "function") {
    callback();
  }
}

// Like/Unlike
export function useHandleSupportPost() {
  const supportLoading = ref(false);
  // Like/Unlike
  const handleSupport = (item) => {
    useHasAuth(async () => {
      // Behavioral judgment
      let type = item.issupport ? "unsupport" : "support";
      let msg = item.issupport ? "Cancel Like" : "Like";

      supportLoading.value = true;

      const {
        error,
      } = await usePostSupportApi(item.id, type);

      supportLoading.value = false;

      // The operation failed, return directly
      if (error.value) return;

      // Likes +1/-1
      if (type === "unsupport") {
        item.support_count--;
      } else {
        item.support_count++;
      }

      item.issupport = !item.issupport;

      const { message } = createDiscreteApi(["message"]);
      message.success(msg + "success");
    });
  };

  return {
    supportLoading,
    handleSupport,
  };
}
