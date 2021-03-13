export function setIntoStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromStorage<T>(key: string, fallback: T): T {
  const items = localStorage.getItem(key);
  try {
    if (items) return JSON.parse(items);
    else return fallback;
  } catch (error) {
    console.error("Something went wrong while getting items from l-storage");
    return fallback;
  }
}
