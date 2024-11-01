import { conditionalClassName } from '@/utils/conditionalClassName'
import { createContext, useState } from 'react'
import { DeleteButton } from './DeleteButton'
import { PaletteButton } from './PaletteButton'
import { ToggleMenuButton } from './ToggleMenuButton'
import './options-menu.css'
import { useOnClickSelector } from '@/hooks/useOnClickSelector'
import { useListsStore } from '@/store/lists/useListsStore'

export const OptionsMenu = () => {
  const [isShowing, setIsShowing] = useState(true)
  const selectedList = useListsStore(s => s.selectedList)

  useOnClickSelector(
    clickedInside => {
      if (!clickedInside && isShowing) setIsShowing(false)
    },
    { selectors: ['.options-menu'] }
  )

  const className = `options-menu ${conditionalClassName([isShowing, 'showing'])}`

  return (
    <OptionsMenuContext.Provider value={{ isShowing, setIsShowing }}>
      <div className={className}>
        {selectedList !== null && (
          <>
            <DeleteButton />
            <PaletteButton color={selectedList.color} />
          </>
        )}
        <ToggleMenuButton />
      </div>
    </OptionsMenuContext.Provider>
  )
}

interface Context {
  isShowing: boolean
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>
}
export const OptionsMenuContext = createContext<Context>({
  isShowing: false,
  setIsShowing: () => {}
})
