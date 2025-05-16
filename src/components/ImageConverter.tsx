import { useState, useCallback, useEffect } from 'react';
import type { FormatOption } from '@/types/imageConverter';
import { FORMAT_OPTIONS } from '@/types/imageConverter';
import { useImageConverter } from '@/hooks/useImageConverter';
import { FormatSelector } from './FormatSelector';
import { FileDropzone } from './FileDropzone';
import { ConvertedImageView } from './ConvertedImageView';

interface ImageConverterProps {
  onConversionStateChange?: (hasConvertedImage: boolean) => void;
}

export function ImageConverter({ onConversionStateChange }: ImageConverterProps) {
  const [selectedFormat, setSelectedFormat] = useState<FormatOption>(FORMAT_OPTIONS[0]);
  const { 
    convertedImage, 
    fileName, 
    isLoading, 
    error, 
    convertImage, 
    reset 
  } = useImageConverter(selectedFormat, onConversionStateChange);

  // Handle file download
  const handleDownload = useCallback(() => {
    if (!convertedImage) return;
    
    const link = document.createElement('a');
    link.href = convertedImage;
    link.download = fileName.replace(/\.heic$/i, selectedFormat.extension);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [convertedImage, fileName, selectedFormat]);

  // Add keyboard event listener for Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && convertedImage) {
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [convertedImage, reset]);

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">HEIC Image Converter</h2>
      
      {!convertedImage ? (
        <div className="flex flex-col gap-4">
          <FormatSelector
            selectedFormat={selectedFormat}
            onFormatChange={setSelectedFormat}
          />
          
          <FileDropzone 
            onFileDrop={convertImage}
            isLoading={isLoading}
            selectedFormat={selectedFormat}
          />
        </div>
      ) : (
        <ConvertedImageView
          imageUrl={convertedImage}
          format={selectedFormat}
          onDownload={handleDownload}
          onReset={reset}
        />
      )}
      
      {error && (
        <div className="mt-4 text-sm text-destructive text-center">
          {error}
        </div>
      )}
    </div>
  );
} 