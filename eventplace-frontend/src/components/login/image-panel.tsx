type LoginImagePanelProps = {
  imageSrc: string
  logo?: string
  title: React.ReactNode
}

export function LoginImagePanel({
  imageSrc,
  title,
}: LoginImagePanelProps) {
  return (
    <section className="relative hidden overflow-hidden border-r border-white/10 lg:block">
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="relative flex h-full flex-col items-center justify-center px-12 text-center">

        <h1 className="max-w-md text-3xl font-semibold leading-tight tracking-normal text-white">
          {title}
        </h1>
      </div>
    </section>
  )
}
