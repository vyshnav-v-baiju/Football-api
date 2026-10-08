import { useEffect, useState } from 'react'

function getTimeLeft(target) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now())
  const totalSeconds = Math.floor(diff / 1000)

  const weeks = Math.floor(totalSeconds / (7 * 24 * 3600))
  const days = Math.floor(
    (totalSeconds % (7 * 24 * 3600)) / (24 * 3600)
  )
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { weeks, days, hours, minutes, seconds }
}

export default function Countdown({ compact = false }) {
  // FIFA Women's World Cup Brazil 2027 starts on June 24, 2027
  const target = '2027-06-24T00:00:00'

  const [time, setTime] = useState(() => getTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTimeLeft(target))
    }, 1000)

    return () => clearInterval(id)
  }, [])

  const items = [
    ['weeks', time.weeks],
    ['days', time.days],
    ['hr', time.hours],
    ['min', time.minutes],
    ['sec', time.seconds],
  ]

  return (
    <div className="mb-5 flex flex-wrap gap-2">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="inline-block w-[80px] rounded-[7px] py-[10px] text-center text-xs text-white"
        >
          <span
            className={`${
              compact ? 'text-base' : 'text-[2rem]'
            } block leading-[1.2]`}
          >
            {value}
          </span>
          {label}
        </div>
      ))}
    </div>
  )
}