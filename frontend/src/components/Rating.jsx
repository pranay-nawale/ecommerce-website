import { Star } from "lucide-react";

export const Rating = ({ value = 0 }) => (
  <div className="flex items-center gap-1 text-amber-500" aria-label={`${value} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, index) => (
      <Star key={index} size={15} fill={index < Math.round(value) ? "currentColor" : "none"} />
    ))}
    <span className="ml-1 text-xs font-medium text-slate-500 dark:text-slate-400">{value.toFixed(1)}</span>
  </div>
);
