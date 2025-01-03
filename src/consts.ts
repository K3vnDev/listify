import { Poppins } from 'next/font/google'

// Fonts
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  variable: '--ff-poppins',
  subsets: ['latin']
})

export const fonts = {
  poppins: poppins.className
}

export const UNSAVED_TASK_ID = 'unsaved-task'
export const UNSAVED_LIST_ID = 'unsaved-list'

export const DEFAULT_LIST_NAME = 'My new list'
export const LISTS_DISPLAY_MODE_ITEM_NAME = 'lists-display-mode'
export const NOT_LOADED_COLOR = '#808080'
