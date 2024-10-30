const colors = [
  '#0066FF',
  '#00C8FF',
  '#00FF26',
  '#7300FF',
  '#9747FF',
  '#FF0037',
  '#FF00EE',
  '#FF6200',
  '#FFD900'
]

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
