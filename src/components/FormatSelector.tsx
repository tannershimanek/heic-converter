import type { FormatOption, OutputFormat } from '@/types/imageConverter';
import { FORMAT_OPTIONS } from '@/types/imageConverter';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormatSelectorProps {
  selectedFormat: FormatOption;
  onFormatChange: (format: FormatOption) => void;
}

export function FormatSelector({ selectedFormat, onFormatChange }: FormatSelectorProps) {
  const handleChange = (value: string) => {
    const formatValue = value as OutputFormat;
    const selected = FORMAT_OPTIONS.find(option => option.value === formatValue) || FORMAT_OPTIONS[0];
    onFormatChange(selected);
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      <label htmlFor="format-select" className="text-sm font-medium">
        Output Format:
      </label>
      <Select 
        defaultValue={selectedFormat.value} 
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-28" id="format-select">
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Formats</SelectLabel>
            {FORMAT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
} 