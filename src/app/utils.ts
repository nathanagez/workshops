export function trackById<T extends { id: string }>(_: number, item: T) {
  return item.id;
}
