export const getContrastingColor = (hexColor: string) => {
  let noHashHexColor = hexColor
  noHashHexColor = hexColor.replace('#', '')

  const modules = []
  for (let i = 0; i < 6; i += 2)
    modules.push(Number.parseInt(noHashHexColor.substring(i, i + 2), 16))

  const [r, g, b] = modules
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance > 128 ? '#000000' : '#FFFFFF'
}
