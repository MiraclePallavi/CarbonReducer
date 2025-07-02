import React from 'react'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { FormField, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CarbonFootprintSchema } from '@/lib/validation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Use z.input to represent the raw form shape (optional inputs)
type CarbonInput = z.input<typeof CarbonFootprintSchema>

interface WeeklyCustomInputProps {
  control: Control<CarbonInput>
  name: FieldPath<CarbonInput>
  label: string
  placeholder: string
  options?: string[]
  className?: string
}

const WeeklyCustomInput: React.FC<WeeklyCustomInputProps> = ({
  control,
  name,
  label,
  placeholder,
  options,
  className = '',
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {options ? (
             <Select 
  onValueChange={(value) => field.onChange(value)} 
  defaultValue={field.value?.toString() || ""}
>
  <SelectTrigger className="w-full p-2 backdrop-blur-md bg-transparent font-medium">
    <SelectValue placeholder={placeholder} />
  </SelectTrigger>
  <SelectContent className="backdrop-blur-md bg-transparent text-white font-medium">
    {options.map((opt) => (
      <SelectItem key={opt} value={opt} className="backdrop-blur-md bg-transparent">
        {opt}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
            ) : (
              <Input
                {...field}
                type="number"
                placeholder={placeholder}
                className={className}
              />
            )}
          </FormControl>
          <FormMessage className="mt-1" />
        </div>
      )}
    />
  )
}

export default WeeklyCustomInput
