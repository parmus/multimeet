import { useEffect, useState } from 'react';


export const useLocalStorage = (key, defautValue = "") => {
  const [value, setItem] = useState(() => {
    const savedValue = localStorage.getItem(key)
    return savedValue || defautValue
  })

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setItem]
}

const passThrough = str => str

export const useLocalStorageCustom = (key, defautValue='', serialize=passThrough, deserialize=passThrough) => {
  const [value, setItem] = useState(() => {
    const savedValue = localStorage.getItem(key)
    return savedValue !== null ? deserialize(savedValue) : defautValue
  })

  useEffect(() => {
    localStorage.setItem(key, serialize(value))
  }, [key, value, serialize])

  return [value, setItem]
}


export const useLocalStorageBool = (key, defautValue = true) => {
  const serialize = bool => bool ? '1' : '0'
  const deserialize = str => str !== '0'
  return useLocalStorageCustom(key, defautValue, serialize, deserialize)
}


export const ExternalLink = ({ href, children }) => {
  if (!children) children = href

  return (
    <a href={href} target="_blank" rel="noreferrer">{children}</a>
  )
}