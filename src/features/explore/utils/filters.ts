export function toggle<T>(v: T, list: T[], set: (v: T[]) => void) {
  set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
}
