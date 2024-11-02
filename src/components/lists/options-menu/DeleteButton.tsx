import { ListContext } from '@/context/ListContext'
import { OptionsMenuContext } from '@/context/OptionsMenuContext'
import { LoadingIcon, TrashIcon } from '@/icons'
import { useListsStore } from '@/store/lists/useListsStore'
import { conditionalClassName } from '@/utils/conditionalClassName'
import { dataFetch } from '@/utils/dataFetch'
import { useParams, useRouter } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'

const MAX_TIME = 1.2
const PERIOD = 0.15

export const DeleteButton = () => {
  const { isShowing } = useContext(OptionsMenuContext)
  const { isBeingDeleted, setIsBeingDeleted } = useContext(ListContext)
  const deleteList = useListsStore(s => s.deleteList)

  const [deletePercentage, setDeletePercentage] = useState(0)
  const interval = useRef<NodeJS.Timeout>()

  const goingDownAnimation = 'going-down .4s ease both'
  const goingUpAnimation = `going-up ${MAX_TIME}s linear both`
  const [sliderValues, setSliderValues] = useState({ animation: goingDownAnimation, height: '0%' })

  const { listId } = useParams()
  const router = useRouter()

  const stopInterval = () => clearInterval(interval.current)

  const onPointerDown = () => {
    if (isBeingDeleted) return

    const [time, add] = [PERIOD * 1000, (100 / MAX_TIME) * PERIOD]
    setSliderValues({ height: '0%', animation: goingUpAnimation })

    interval.current = setInterval(() => {
      setDeletePercentage(d => {
        if (d >= 100) {
          setIsBeingDeleted(true)
          stopInterval()
          return 100
        }
        return d + add
      })
    }, time)
  }

  const onPointerUp = () => {
    if (isBeingDeleted) return

    setSliderValues({ height: `${deletePercentage}%`, animation: goingDownAnimation })
    setDeletePercentage(0)
    stopInterval()
  }

  useEffect(() => stopInterval, [])

  useEffect(() => {
    if (isBeingDeleted) {
      setSliderValues({ height: '100%', animation: goingUpAnimation })

      dataFetch({
        url: `/api/lists?list-id=${listId}`,
        options: { method: 'DELETE' },
        onSuccess: () => {
          if (typeof listId === 'string') deleteList(listId)
          router.push('/mylists')
        },
        onError: () => {
          setIsBeingDeleted(false)
          setSliderValues(sv => ({ ...sv, animation: goingDownAnimation }))
        }
      })
    }
  }, [isBeingDeleted])

  const className = conditionalClassName([
    deletePercentage > 0 && deletePercentage < 100,
    'pointer-pressing'
  ])

  return (
    <button
      {...{ onPointerDown, onPointerUp }}
      className={`bg-zinc-700 button relative overflow-hidden ${className}`}
      disabled={!isShowing || isBeingDeleted}
    >
      {
        // biome-ignore format: <>
        isBeingDeleted 
          ? <LoadingIcon className='z-20 animate-spin'/>
          : <TrashIcon className='z-20' />
      }

      <div
        style={{ ...sliderValues }}
        className='absolute w-full bottom-0 left-0 bg-red-600 z-10'
      />
    </button>
  )
}
