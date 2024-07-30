// Like/Unlike
export function usePostSupportApi(post_id, type = "support") {
  return useHttpPost("postSupport", `/post/${type}`, {
    body: {
      post_id,
    },
  });
}

// Delete a post
export function useDeletePostApi(id) {
  return useHttpPost("deletePost", `/post/delete`, {
    body: {
      id,
    },
  });
}

// Community Category List
export function useBbsListApi() {
  return useHttpGet("bbsList", "/bbs?page=1", {
    lazy: true,
  });
}

// List of posts in a specified category
export function usePostListApi(query) {
  return useHttpGet("postList", () => {
    let q = useQueryToString(query());
    return `/post/list${q}`;
  }, {
    lazy: true,
  });
}

// View Post
export function useReadPostApi(id) {
  return useHttpGet("readPost", "/post/read?id=" + id, {
    lazy: true,
  });
}

// View post comments list
export function usePostCommentApi(query) {
  return useHttpGet("PostComment", () => {
    let q = useQueryToString(query());
    return `/post_comment${q}`;
  }, {
    lazy: true,
  });
}

// Comment on a post
export function useReplyPostApi(body) {
  return useHttpPost("ReplyPost", "/post/reply", {
    body,
  });
}

// Post a message
export function useAddPostApi(body) {
  return useHttpPost("addPost", "/post/save", {
    body,
  });
}
