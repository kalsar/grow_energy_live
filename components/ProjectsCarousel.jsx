"use client"

import Image from 'next/image'
import {MapPin, Zap} from 'lucide-react'
import {useEffect, useMemo, useRef, useState} from 'react'
import {urlFor} from '@/lib/sanity'

const fallback = [
  {
    _id: '1',
    title: 'Rooftop Solar - Pune',
    location: 'Pune, Maharashtra',
    capacityKw: 12,
    description: 'Commercial rooftop installation with net metering and smart monitoring.',
  },
  {
    _id: '2',
    title: 'Factory Plant - Nashik',
    location: 'Nashik, Maharashtra',
    capacityKw: 75,
    description: 'Ground-mounted system for industrial operations and daytime peak load offset.',
  },
]

export default function ProjectsCarousel({projects}) {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const items = projects?.length ? projects : fallback
  const [layout, setLayout] = useState({cardWidth: 280, visibleCount: 4})
  const {renderItems, cycleCount} = useMemo(() => {
    const minCards = Math.max(layout.visibleCount * 4, items.length)
    const repeatCount = Math.ceil(minCards / items.length)
    const filled = Array.from({length: repeatCount}, () => items).flat()

    return {
      renderItems: [...filled, ...filled],
      cycleCount: filled.length,
    }
  }, [items, layout.visibleCount])

  useEffect(() => {
    if (!wrapRef.current) return

    const updateSize = () => {
      const width = wrapRef.current.clientWidth
      const visible = width >= 1024 ? 4 : width >= 768 ? 2 : 1
      const gap = 16
      const cardWidth = (width - gap * (visible - 1)) / visible
      setLayout({cardWidth, visibleCount: visible})
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(wrapRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!trackRef.current || !cycleCount) return

    const track = trackRef.current
    const gap = 16
    const totalWidth = (layout.cardWidth + gap) * cycleCount
    let offset = 0
    let frameId
    let lastTime = 0
    const speed = 0.06

    const animate = (time) => {
      if (!lastTime) lastTime = time
      const delta = time - lastTime
      lastTime = time
      offset = (offset + speed * delta) % totalWidth
      track.style.transform = `translateX(-${offset}px)`
      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frameId)
  }, [layout.cardWidth, cycleCount])

  return (
    <div className="carousel-wrap" ref={wrapRef}>
      <div className="carousel-track" ref={trackRef}>
        {renderItems.map((project, idx) => {
          const imgUrl = project.image ? urlFor(project.image).width(720).height(480).url() : null

          return (
            <article className="project-card" key={`${project._id}-${idx}`} style={{width: `${layout.cardWidth}px`}}>
              <div className="project-image">
                {imgUrl ? (
                  <Image src={imgUrl} alt={project.title} fill sizes="(max-width: 768px) 90vw, 33vw" />
                ) : (
                  <div className="image-fallback" aria-hidden="true" />
                )}
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-meta">
                  <MapPin size={16} /> {project.location}
                </p>
                <p className="project-meta">
                  <Zap size={16} /> {project.capacityKw} kW
                </p>
                <p>{project.description}</p>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
