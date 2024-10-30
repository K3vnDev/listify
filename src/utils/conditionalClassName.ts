type Params = Array<[boolean, string]>

export const conditionalClassName = (...params: Params) => {
  for (const [condition, name] of params) {
    if (condition) return name
  }
  return ''
}
