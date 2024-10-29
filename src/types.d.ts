export interface List {
  id: string
  name: string
  color: string
}

export interface Task {
  id: string
  text: string
  done: boolean
}

export type ListsDisplayMode = 'list' | 'grid'
