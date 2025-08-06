// This is the existing star rating component, ensure it uses green theme colors
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: number
  className?: string
}

export default function StarRating({ rating, maxRating = 5, size = 16, className }: StarRatingProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={`${i < rating ? "text-yellow-400 fill-yellow-400" : "text-green-700"} transition-colors`} // Using yellow for stars as it's standard, adjust if pure green is needed
        />
      ))}
    </div>
  )
}
