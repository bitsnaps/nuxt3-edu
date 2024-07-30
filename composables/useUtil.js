// Convert objects to url parameters
export function useQueryToString(query = {}) {
  let q = "";
  for (const key in query) {
    if (q == "") {
      q = `?${key}=${query[key]}`;
    } else {
      q += `&${key}=${query[key]}`;
    }
  }
  return q;
}

// Carriage return event
export function useEnterEvent(event) {
  function handleEnterEvent(e) {
    if (e.key === "Enter") {
      event();
      // Cancel the default action of an event
      e.preventDefault();
    }
  }

  onBeforeMount(() => document.addEventListener("keydown", handleEnterEvent));
  onUnmounted(() => document.removeEventListener("keydown", handleEnterEvent));
}

// Time status judgment
export function useTimeStatus(start, end) {
  start = (new Date(start)).getTime();
  end = (new Date(end)).getTime();
  const now = Date.now();

  let status = "";
  if (start < now && now < end) {
    status = "ing";
  } else if (start >= now) {
    status = "pending";
  } else {
    status = "end";
  }

  return status;
}
