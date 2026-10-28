import React from "react";

const SongTitle = ({ title, singer }: { title: string; singer: string }) => {
  return (
    <div className="mt-5 px-1.5">
      <div className="text-xs font-semibold text-[#8A918C]">Device</div>
      <div className="mt-1 text-base font-bold">{title}</div>
      <div className="text-sm font-medium">{singer}</div>
    </div>
  );
};

export default SongTitle;
