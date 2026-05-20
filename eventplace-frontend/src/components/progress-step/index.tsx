import type { LucideIcon } from "lucide-react";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";

interface Step {
  icon: LucideIcon;
  label: string;
}

interface ProgressStepProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressStep({
  steps,
  currentStep,
}: ProgressStepProps) {
  return (
    <div className="flex w-full max-w-full items-start overflow-hidden">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isLast = index === steps.length - 1;
        const isActive = currentStep >= index;

        return (
          <Fragment key={step.label}>
            <div className="flex min-w-0 basis-20 flex-col items-center sm:basis-32">
              <div
                className={`mb-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? "bg-[#7C3AE0]"
                    : "bg-white/20"
                }`}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>

              <Label className="block w-full text-center text-xs leading-tight text-white">
                {step.label}
              </Label>
            </div>

            {!isLast && (
              <div className="flex h-10 min-w-38 flex-1 items-center px-2">
                <Progress
                  value={currentStep > index ? 100 : 0}
                  className="h-2 w-full bg-white/20 [&>div]:bg-[#7C3AE0]"
                />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}