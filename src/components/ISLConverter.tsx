import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ISLConverter = () => {
  const [text, setText] = useState('');
  const [signs, setSigns] = useState<string[]>([]);

  const getSignImage = (char: string): string => {
    // Convert character to uppercase for consistency
    const upperChar = char.toUpperCase();
    
    // Process both alphabets and numbers
    if (upperChar.match(/[A-Z0-9]/)) {
      return `/isl/${upperChar}.png`;
    }
    return '';
  };

  useEffect(() => {
    const convertToSigns = () => {
      const signImages = text
        .split('')
        .map(char => getSignImage(char))
        .filter(Boolean);
      setSigns(signImages);
    };

    convertToSigns();
  }, [text]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.match(/^[a-zA-Z0-9\s]*$/)) {
      setText(value);
    } else {
      toast.error("Please enter only alphabets and numbers");
    }
  };

  const handleImageError = (index: number) => {
    toast.error(`Failed to load image for "${text[index]}"`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            ISL Alphabet & Number Converter
          </h1>
          <p className="text-gray-600">
            Convert text and numbers to Indian Sign Language hand signs
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-input">Enter Text or Numbers</Label>
              <Input
                id="text-input"
                placeholder="Type something..."
                value={text}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>
        </Card>

        {signs.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {signs.map((sign, index) => (
              <Card key={index} className="p-4 flex flex-col items-center">
                <img
                  src={sign}
                  alt={`Sign for ${text[index]}`}
                  className="w-24 h-24 object-contain"
                  onError={() => handleImageError(index)}
                />
                <p className="mt-2 text-lg font-semibold text-blue-600">
                  {text[index].toUpperCase()}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ISLConverter;