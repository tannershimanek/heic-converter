import { useDropzone } from 'react-dropzone';
import type { FormatOption } from '@/types/imageConverter';
import { cn } from '@/lib/utils';
import DropToUpload from '@react-spectrum/s2/illustrations/linear/DropToUpload';

interface FileDropzoneProps {
  onFileDrop: (file: File) => void;
  isLoading: boolean;
  selectedFormat: FormatOption;
}

export function FileDropzone({ onFileDrop, isLoading, selectedFormat }: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileDrop(acceptedFiles[0]);
      }
    },
    accept: {
      'image/heic': ['.heic', '.HEIC']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
        isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
      )}
      style={{ width: "300px" }}
    >
      <input {...getInputProps()} />
      {isLoading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4" />
          <p>Converting to {selectedFormat.label}...</p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-center">
            <div 
              className="w-20 h-20 text-primary"
              aria-hidden="true"
              role="presentation"
            >
              <DropToUpload />
            </div>
          </div>
          <p className="mb-2 text-sm font-medium">
            {isDragActive ? "Drop the file here" : "Drag and drop a HEIC file here"}
          </p>
          <p className="text-xs text-muted-foreground">or click to select a file</p>
        </>
      )}
    </div>
  );
} 