export const newObjFromOther = (obj, type = 'array') => {
  const defaultValue = type === 'array' ? [] : {}
  try {
    const value = JSON.parse(JSON.stringify(obj))
    return value
  } catch (e) {
    return defaultValue
  }
}
