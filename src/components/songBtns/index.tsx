import React from "react";

const SongBtns = ({
  playing,
  onToggle,
}: {
  playing: boolean;
  onToggle: any;
}) => {
  const I = {
    shuffle: "M3 7h4l10 10h4M3 17h4l3-3M14 10l3-3h4M18 4l3 3-3 3M18 14l3 3-3 3",
    repeat:
      "M4 11V9a3 3 0 0 1 3-3h13M17 3l3 3-3 3M20 13v2a3 3 0 0 1-3 3H4M7 21l-3-3 3-3",
    prev: "M11 6v12l-8-6zM21 6v12l-8-6z",
    next: "M13 6v12l8-6zM3 6v12l8-6z",
    pause: "M7 5h3.5v14H7zM13.5 5h3.5v14h-3.5z",
    play: "M8 5v14l11-7z",
    volLow: "M4 9v6h4l5 4V5L8 9z",
    volHigh: "M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11",
    devices: "M4 5h12v9H4zM8 18h4M10 14v4M19 8v10",
  } as const;

  function Icon({
    d,
    className,
    solid = false,
    stroke = 1.8,
  }: {
    d: string;
    className: string;
    solid?: boolean;
    stroke?: number;
  }) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill={solid ? "currentColor" : "none"}
        stroke={solid ? "none" : "currentColor"}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={d} />
      </svg>
    );
  }

  return (
    <div className="mt-3 flex items-center justify-between px-2">
      <button
        type="button"
        aria-label="Перемешать"
        className="flex size-11 items-center justify-center text-white"
      >
        <Icon d={I.shuffle} className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Предыдущий"
        className="flex size-11 items-center justify-center text-white"
      >
        <Icon d={I.prev} className="size-8" solid />
      </button>
      <button
        type="button"
        onClick={onToggle}
        aria-label="Пауза"
        className="flex size-14 items-center justify-center text-white"
      >
        {playing ? (
          <Icon d={I.pause} className="size-9" solid />
        ) : (
          <Icon d={I.play} className="size-9" solid />
        )}
      </button>
      <button
        type="button"
        aria-label="Следующий"
        className="flex size-11 items-center justify-center text-white"
      >
        <Icon d={I.next} className="size-8" solid />
      </button>
      <button
        type="button"
        aria-label="Повтор"
        className="flex size-11 items-center justify-center text-[#3DDC84]"
      >
        <Icon d={I.repeat} className="size-4" />
      </button>
    </div>
  );
};

export default SongBtns;
