import { TypographyP } from "../ui/typography";

interface InfoCardProps {
  title: string
  description: string
}

export function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="flex flex-col items-center bg-[#18181b] border-[0.5px] border-[rgba(124,58,237,0.2)] py-6 px-7 rounded-lg justify-between">
      <TypographyP className="border-none text-[#7c3aeD] text-4xl font-bold">{title}</TypographyP>
      <TypographyP className="text-gray-500">{description}</TypographyP>
    </div>
  )
}