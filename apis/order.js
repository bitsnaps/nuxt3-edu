// Get product information
export function useGetGoodsInfoApi(id, type = "course") {
  return useHttpGet("GetGoodsInfo", `/goods/read?type=${type}&id=${id}`, {
    lazy: true,
  });
}

// Get available coupons
export function useGetUseableUserCouponApi(id, type = "course") {
  return useHttpGet(
    "GetUseableUserCoupon",
    `/user_coupon?goods_id=${id}&type=${type}&page=1`,
  );
}

// Create Order
export function useCreateOrderApi(body, type = "") {
  let url = `/order/save`;

  if (type == "flashsale") {
    url = "/order/flashsale";
  } else if (type == "group") {
    url = "/order/group";
  }

  return useHttpPost("CreateOrder", url, {
    body,
  });
}

// WeChat PC payment
export function useWxpayApi(no) {
  return useHttpPost("wxpay", `/order/wxpay`, {
    body: {
      no,
    },
  });
}

// Check whether the order payment is successful
export function useGetWxpayStatusApi(no) {
  return useHttpPost("getWxpayStatus", `/order/iswxpay`, {
    body: {
      no,
    },
    $: true,
  });
}

// List of groups that can be formed in the current group buying column/course
export function useGetGroupWorkListApi(group_id, page = 1) {
  return useHttpGet(
    "getGroupWorkList",
    `/group_work/list?group_id=${group_id}&page=${page}`,
  );
}
