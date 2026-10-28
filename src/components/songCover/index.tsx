import React from "react";

const SongCover = ({ cover }: { cover: string }) => {
  return (
    <div
      className="relative aspect-[1/0.7] w-full overflow-hidden rounded-3xl"
      style={{ background: `url(${cover}) center / contain` }}
    ></div>
  );
};

export default SongCover;
