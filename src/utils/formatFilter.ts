
export const formatFilter = (filter) => {
  const newFilter = {}
  for (const key in filter) {
    const value = filter[key]
    if (value && value !== 'all') {
      newFilter[key] = value
    }
  }
  return newFilter
}
