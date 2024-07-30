// Get Course List
export function useCourseListApi(page) {
  return useHttpGet("CourseList", `/course/list?page=${page}`, {
    lazy: true,
  });
}

// View course details
export function useReadCourseApi(query = {}) {
  let q = useQueryToString(query);
  return useHttpGet("readCourse", `/course/read${q}`, {
    lazy: true,
  });
}

// Recommended
export function useHotCourseListApi() {
  return useHttpGet("HotCourseList", `/hot`);
}

// Learn for free
export function useLearnApi(body) {
  return useHttpPost("learn", "/order/learn", {
    body,
  });
}
