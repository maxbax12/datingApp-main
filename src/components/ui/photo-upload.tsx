import { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  photos: string[];
  onChange: (photos: string[]) => void;
  maxPhotos?: number;
  className?: string;
}

export const PhotoUpload = ({ photos, onChange, maxPhotos = 6, className }: PhotoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newPhotos = [...photos];
    
    Array.from(files).forEach((file) => {
      if (newPhotos.length < maxPhotos && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result && !newPhotos.includes(result)) {
            newPhotos.push(result);
            onChange([...newPhotos]);
          }
        };
        reader.readAsDataURL(file);
      }
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onChange(newPhotos);
  };

  const addDemoPhotos = () => {
    const mockPhotos = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    ];
    onChange([...photos, ...mockPhotos.slice(0, maxPhotos - photos.length)]);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: maxPhotos }).map((_, index) => (
          <div
            key={index}
            className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-pink-400 transition-colors cursor-pointer relative group"
            onClick={() => {
              if (!photos[index]) {
                fileInputRef.current?.click();
              }
            }}
          >
            {photos[index] ? (
              <>
                <img
                  src={photos[index]}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(index);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </>
            ) : (
              <div className="text-center">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <span className="text-xs text-gray-500">
                  {index === 0 ? "Add photo" : ""}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex space-x-3">
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="flex-1"
          disabled={photos.length >= maxPhotos}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Photos
        </Button>
        
        <Button
          onClick={addDemoPhotos}
          variant="outline"
          className="flex-1"
          disabled={photos.length >= maxPhotos}
        >
          <Camera className="h-4 w-4 mr-2" />
          Demo Photos
        </Button>
      </div>

      {photos.length > 0 && (
        <div className="text-center text-sm text-green-600">
          ✅ {photos.length} photo{photos.length !== 1 ? 's' : ''} added!
        </div>
      )}
    </div>
  );
};