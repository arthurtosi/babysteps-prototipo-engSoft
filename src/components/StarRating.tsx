import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating?: number;
  onRatingChange?: (rating: number) => void;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  showText?: boolean;
  reviewCount?: number;
}

const StarRating = ({ 
  rating = 0, 
  onRatingChange, 
  maxRating = 5, 
  size = "md",
  readonly = false,
  showText = false,
  reviewCount
}: StarRatingProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  };

  const textClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const handleClick = (newRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleMouseEnter = (newRating: number) => {
    if (!readonly) {
      setHoveredRating(newRating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoveredRating(0);
    }
  };

  const displayRating = hoveredRating || rating;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: maxRating }, (_, index) => {
          const starRating = index + 1;
          const isFilled = starRating <= displayRating;
          
          return (
            <Star
              key={index}
              className={cn(
                sizeClasses[size],
                "transition-colors",
                isFilled ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                !readonly && "cursor-pointer hover:text-yellow-400"
              )}
              onClick={() => handleClick(starRating)}
              onMouseEnter={() => handleMouseEnter(starRating)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
      
      {showText && (
        <div className={cn("flex items-center gap-1", textClasses[size])}>
          <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
          {reviewCount && (
            <span className="text-muted-foreground">
              ({reviewCount} avaliações)
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StarRating;