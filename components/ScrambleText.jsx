"use client"

import {useEffect, useMemo, useState} from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export default function ScrambleText({words = [], interval = 2200, className = ''}) {
  const safeWords = useMemo(() => (words.length ? words : ['Clean Power']), [words])
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState(safeWords[0])

  useEffect(() => {
    const ticker = setInterval(() => {
      const nextIndex = (index + 1) % safeWords.length
      const target = safeWords[nextIndex]
      let frame = 0
      const maxFrames = 12

      const scramble = setInterval(() => {
        const progress = frame / maxFrames
        const fixed = Math.floor(progress * target.length)
        const text = target
          .split('')
          .map((char, i) => (i < fixed ? char : randomChar()))
          .join('')

        setDisplay(text)
        frame += 1

        if (frame > maxFrames) {
          clearInterval(scramble)
          setDisplay(target)
          setIndex(nextIndex)
        }
      }, 28)
    }, interval)

    return () => clearInterval(ticker)
  }, [index, interval, safeWords])

  return <span className={className}>{display}</span>
}

