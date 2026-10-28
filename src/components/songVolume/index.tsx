"use client";

const VOL_LOW = "M4 9v6h4l5 4V5L8 9z";
const VOL_HIGH = "M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11";

function Icon({
  d,
  className,
  solid = false,
}: {
  d: string;
  className: string;
  solid?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={solid ? "currentColor" : "none"}
      stroke={solid ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const SongVolume = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => {
  return (
    <div className="mt-2 flex items-center gap-3 px-2 text-[#8A918C]">
      <Icon d={VOL_LOW} className="size-4 shrink-0" solid />

      <div className="relative h-1 flex-1 rounded-full bg-[#3B433E]">
        <div
          className="h-1 rounded-full bg-white"
          style={{ width: `${value}%` }}
        />
        <div
          className="absolute -top-1.5 size-4 -translate-x-1/2 rounded-full bg-white"
          style={{ left: `${value}%` }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Громкость"
          className="absolute inset-x-0 -top-2 h-5 w-full cursor-pointer opacity-0"
        />
      </div>

      <Icon d={VOL_HIGH} className="size-4 shrink-0" />
    </div>
  );
};

export default SongVolume;
