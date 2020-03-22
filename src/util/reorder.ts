export type Reorder<T> = {
  list: T[]
  startIndex: number
  endIndex: number
  offset: number
}

export const reorder = <T>({
  list,
  startIndex,
  endIndex,
  offset,
}: Reorder<T>) => {
  const result = [...list]
  const [removed] = result.splice(startIndex - offset, 1)
  result.splice(endIndex - offset, 0, removed)
  return result
}
