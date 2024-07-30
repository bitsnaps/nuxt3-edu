// carry out an assignment
export function useSubmitTestApi(body) {
  return useHttpPost("SubmitTest", "/user_test/save", {
    body,
  });
}

// Start the exam
export function useReadTestpaperApi(id) {
  return useHttpGet("ReadTestpaper", "/testpaper/read?id=" + id);
}
