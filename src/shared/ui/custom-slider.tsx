import { cn } from "./shadcn-ui";

interface CustomSliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
}

export function CustomSlider({
  value,
  min,
  max,
  step = 1,
  onChange,
  className,
}: CustomSliderProps) {
  const range = max - min;
  const percent = range === 0 ? 0 : ((value - min) / range) * 100;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative h-1.5 bg-[hsl(187,30%,96%)] rounded-full">
        {/* Filled track */}
        <div
          className="absolute left-0 top-0 h-1.5 rounded-full pointer-events-none bg-[linear-gradient(90deg,#0badc2,#0aa5be)]"
          style={{ width: `${percent}%` }}
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#0badc2] shadow-[0_0_0_4px_hsl(187_89%_40%/0.15),0_2px_8px_hsl(187_89%_40%/0.2)] hover:scale-110 transition-transform duration-150 pointer-events-none"
          style={{ left: `calc(${percent}% - 8px)` }}
        />
        {/* Native input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full m-0"
        />
      </div>
    </div>
  );
}
