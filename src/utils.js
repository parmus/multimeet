import { useEffect, useState } from 'react';

export const useLocalStorage = (key, defautValue = "") => {
  const [item, setItem] = useState(() => {
    const savedCalendarId = localStorage.getItem(key)
    return savedCalendarId || defautValue
  })

  useEffect(() => {
    localStorage.setItem(key, item)
  }, [key, item])

  return [item, setItem]
}