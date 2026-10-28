"use client";
import SongBtns from "@/components/songBtns";
import SongCover from "@/components/songCover";
import SongTimer from "@/components/songTimer";
import SongTitle from "@/components/songTitle";
import SongVolume from "@/components/songVolume";
import { useEffect, useRef, useState } from "react";

// Статичные данные — вне компонента, чтобы не пересоздавались на каждый рендер
const TRACK = {
  device: "Device",
  title: "505",
  artist: "Arctic Monkeys",
  audio: "/505.mp3", // файлы лежат в public/
  cover: "/cover.jpg",
};

// 253.4 -> "4:13"
const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

const Page = () => {
  const audio = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(45); // %

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    a.volume = volume / 100;
    if (a.readyState >= 1) setDuration(a.duration);
  }, []);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  };

  const changeVolume = (v: number) => {
    setVolume(v);
    if (audio.current) audio.current.volume = v / 100;
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div className="w-85 rounded-4xl bg-[#1F2521] p-3.5 font-sans text-white shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
      <SongCover cover={TRACK.cover} />
      <SongTitle title={TRACK.title} singer={TRACK.artist} />
      <SongTimer
        current={fmt(current)}
        remaining={`-${fmt(duration - current)}`}
        progress={progress}
      />
      <SongBtns playing={playing} onToggle={toggle} />
      <SongVolume value={volume} onChange={changeVolume} />

      <audio
        ref={audio}
        src={TRACK.audio}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
};

export default Page;
