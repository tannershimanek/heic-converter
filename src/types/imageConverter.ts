// Types and constants for the image converter component
export type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';

export interface FormatOption {
  value: OutputFormat;
  label: string;
  extension: string;
}

export const FORMAT_OPTIONS: FormatOption[] = [
  { value: 'image/jpeg', label: 'JPG', extension: '.jpg' },
  { value: 'image/png', label: 'PNG', extension: '.png' },
  { value: 'image/webp', label: 'WebP', extension: '.webp' },
];

export interface ConversionState {
  convertedImage: string | null;
  fileName: string;
  isLoading: boolean;
  error: string | null;
}

export interface ImageConverterProps {
  onConversionStateChange?: (hasConvertedImage: boolean) => void;
} 