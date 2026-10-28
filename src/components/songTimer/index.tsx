import React from "react";

const SongTimer = ({
  current,
  remaining,
  progress,
}: {
  current: string;
  remaining: string;
  progress: any;
}) => {
  return (
    <div className="mt-4 px-1.5">
      <div className="h-1 rounded-full bg-[#3B433E]">
        <div className={`h-1 w-[${progress}] rounded-full bg-white`} />
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] font-semibold text-[#8A918C]">
        <span>{current}</span>
        <span>{remaining}</span>
      </div>
    </div>
  );
};

export default SongTimer;
