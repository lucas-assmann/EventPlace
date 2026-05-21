import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'


export interface RadioOption {
  id: string
  label: string
  description?: string
  badge?: string
}

interface RadioGroupFieldProps {
  options: RadioOption[]
  value: string
  onValueChange: (value: string) => void
}

export function RadioGroupField({ options, value, onValueChange }: RadioGroupFieldProps) {
  return (
    <RadioGroup value={value} onValueChange={onValueChange} className="flex flex-col gap-2">
      {options.map((option) => (
        <Label
          key={option.id}
          htmlFor={option.id}
          className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-all ${value === option.id
              ? 'border-purple-500/60 bg-purple-500/10'
              : 'border-white/7 bg-zinc-950 hover:border-white/15'
            }`}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem id={option.id} value={option.id} className="border-white/30" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-white">{option.label}</span>
              {option.description && (
                <span className="text-xs text-white/35">{option.description}</span>
              )}
            </div>
          </div>
          {option.badge && (
            <span className={`text-sm font-semibold ${value === option.id ? 'text-purple-400' : 'text-white/60'}`}>
              {option.badge}
            </span>
          )}
        </Label>
      ))}
    </RadioGroup>
  )
}