import { useState, useCallback, useEffect } from 'react';
import heic2any from 'heic2any';
import type { ConversionState, FormatOption } from '@/types/imageConverter';

// Custom hook for image conversion logic
export function useImageConverter(
  selectedFormat: FormatOption, 
  onConversionStateChange?: (hasConvertedImage: boolean) => void
) {
  const [conversionState, setConversionState] = useState<ConversionState>({
    convertedImage: null,
    fileName: '',
    isLoading: false,
    error: null
  });
  
  // Notify parent component when conversion state changes
  useEffect(() => {
    onConversionStateChange?.(conversionState.convertedImage !== null);
  }, [conversionState.convertedImage, onConversionStateChange]);

  const convertImage = useCallback(async (file: File) => {
    setConversionState(prev => ({ 
      ...prev, 
      fileName: file.name,
      error: null,
      isLoading: true 
    }));
    
    if (!file.name.toLowerCase().endsWith('.heic')) {
      setConversionState(prev => ({ 
        ...prev, 
        error: 'Please upload a HEIC image file',
        isLoading: false 
      }));
      return;
    }
    
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: selectedFormat.value,
        quality: 0.9
      }) as Blob;
      
      const url = URL.createObjectURL(convertedBlob);
      
      setConversionState(prev => ({ 
        ...prev, 
        convertedImage: url,
        isLoading: false 
      }));
    } catch (err) {
      console.error('Conversion error:', err);
      setConversionState(prev => ({ 
        ...prev, 
        error: 'Error converting image. Please try again.',
        isLoading: false 
      }));
    }
  }, [selectedFormat]);

  const reset = useCallback(() => {
    setConversionState({
      convertedImage: null,
      fileName: '',
      isLoading: false,
      error: null
    });
  }, []);

  return {
    ...conversionState,
    convertImage,
    reset
  };
} 