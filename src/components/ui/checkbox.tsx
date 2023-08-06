import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import * as React from "react"

import { CheckIcon } from "@radix-ui/react-icons"
import IconCheck from "@/ui/icons/icon-check"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-md border-2 border-eminence-300 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-eminence-400 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-eminence-800 data-[state=checked]:text-eminence-100",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <IconCheck className="h-3 w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
