export const reorder = ({ list, startIndex, endIndex, offset }) => {
  const result = [...list]
  const [removed] = result.splice(startIndex - offset, 1)
  result.splice(endIndex - offset, 0, removed)
  return result
}
