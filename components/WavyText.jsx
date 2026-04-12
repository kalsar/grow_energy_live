"use client"

export default function WavyText({text, className = ''}) {
  return (
    <span className={`wave-text ${className}`} aria-label={text}>
      {Array.from(text).map((char, index) => (
        <span
          key={`${char}-${index}`}
          className={`wave-char ${char === ' ' ? 'wave-space' : ''}`}
          style={{animationDelay: `${index * 0.06}s`}}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

