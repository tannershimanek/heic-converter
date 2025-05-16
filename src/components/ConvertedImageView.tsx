import type { FormatOption } from '@/types/imageConverter';
import { Button } from './ui/button';

interface ConvertedImageViewProps {
  imageUrl: string;
  format: FormatOption;
  onDownload: () => void;
  onReset: () => void;
}

export function ConvertedImageView({
  imageUrl,
  format,
  onDownload,
  onReset
}: ConvertedImageViewProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden border border-border">
        <img 
          src={imageUrl} 
          alt={`Converted ${format.label}`} 
          className="w-full h-auto"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={onDownload} className="flex-1">
          Download {format.label}
        </Button>
        <Button 
          variant="outline" 
          onClick={onReset} 
          className="bg-white text-black border-input hover:bg-accent hover:text-accent-foreground"
        >
          Convert Another
        </Button>
      </div>
      <p className="text-xs text-center text-muted-foreground">Press ESC to go back to upload screen</p>
    </div>
  );
} 