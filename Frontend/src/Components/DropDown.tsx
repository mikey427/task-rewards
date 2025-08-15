import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  options: { value: string; label: string }[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
};

export default function DropDown({
  options,
  onValueChange,
  placeholder,
  className = "",
  id,
}: Props) {
  return (
    <div id={id} className={`${className}`}>
      <Select onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
