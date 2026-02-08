import * as React from "react";

import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
}

function Select({ className, options, ...props }: SelectProps) {
  return (
    <select
      data-slot="select"
      className={cn(
        "border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus:border-ring focus:ring-ring/50 focus:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export { Select };

