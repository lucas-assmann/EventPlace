interface EventBannerProps {
  src: string
  alt: string
}

export function EventBanner({ src, alt }: EventBannerProps) {
  return (
    <div className="relative h-72 w-full sm:h-96">
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
    </div>
  )
}