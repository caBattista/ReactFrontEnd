export function navigate(path: string) {
  if (window.location.pathname === path) return
  window.history.pushState({}, "", path)
  window.dispatchEvent(new PopStateEvent("popstate"))
}

export function getPath(): string {
  return window.location.pathname || "/"
}


