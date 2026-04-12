"use client"

import {useEffect, useRef, useState} from 'react'

function AnimatedNumber({target, prefix = '', suffix = '', duration = 1400}) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      {threshold: 0.3},
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return

    let frameId
    let startTime

    const animate = (time) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      const eased = 1 - (1 - progress) * (1 - progress)
      setValue(Math.round(target * eased))
      if (progress < 1) frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frameId)
  }, [started, target, duration])

  return (
    <strong ref={ref}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </strong>
  )
}

export default function StatsHighlights({stats}) {
  return (
    <section className="section light-bg">
      <div className="container">
        <h2>Performance Highlights</h2>
        <div className="stats-grid">
          {stats.map((item) => (
            <article className="stat-card" key={item.label}>
              <AnimatedNumber
                target={item.target}
                prefix={item.prefix}
                suffix={item.suffix}
                duration={item.duration || 1400}
              />
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

