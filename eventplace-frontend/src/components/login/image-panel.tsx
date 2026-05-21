import { type ReactNode, useEffect, useState } from 'react'

type LoginImagePanelProps = {
  imageSrc: string
  imageSrcs?: string[]
  logo?: string
  title?: ReactNode
}

export function LoginImagePanel({
  imageSrc,
  imageSrcs,
  title,
}: LoginImagePanelProps) {
  const slides = imageSrcs && imageSrcs.length > 0 ? imageSrcs : [imageSrc]
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 5000)

    return () => {
      window.clearInterval(timer)
    }
  }, [slides.length])

  return (
    <section className="relative hidden overflow-hidden border-r border-white/10 min-[600px]:block">
      {slides.map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-in duration-1000 ${index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
        />
      ))}
      <div className="relative flex h-full flex-col items-center justify-center px-12 text-center">
        <h1 className="max-w-md text-3xl font-semibold leading-tight tracking-normal text-white">
          {title}
        </h1>
      </div>
    </section>
  )
}
